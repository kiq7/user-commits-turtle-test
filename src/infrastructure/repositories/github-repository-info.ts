import { Octokit } from '@octokit/rest'

import { DateUtils } from '../../utils/date-utils'
import { RepositoryNotFoundError } from '../../application/errors/repository-not-found-error'
import { Commit, RepositoryInfo, UsersDateCommit } from '../../application/repositories/repository-info'

export class GitHubRepositoryInfo implements RepositoryInfo {
  constructor (
    private readonly gitHubClient: Octokit,
    private readonly dateUtils: DateUtils
  ) { }

  async getCommits (owner: string, repo: string, since: string, until: string): Promise<UsersDateCommit[]> {
    try {
      const sinceIso = this.dateUtils.formatDateToIso({ date: since })
      const untilIso = this.dateUtils.formatDateToIso({ date: until, formatEndDayTime: true })

      const { data } = await this.gitHubClient.repos.listCommits({ owner, repo, since: sinceIso, until: untilIso })
      const commitsWithUserInfo = data.filter(data => data.author !== null)

      const commitsDates = [...new Set(commitsWithUserInfo.map(({ commit }) => this.dateUtils.formatDateString(commit.author.date)))].sort()
      const commitsAuthors = [...new Set(commitsWithUserInfo.map(({ author }) => author.login))]

      return commitsDates.map((date): UsersDateCommit => {
        const users = commitsAuthors.map(user => {
          const userCommits = commitsWithUserInfo
            .filter(({ author }) => author.login === user)
            .filter(({ commit }) => this.dateUtils.formatDateString(commit.author.date) === date)

          return {
            user,
            commitCount: userCommits.length
          }
        })

        return {
          date,
          users
        }
      })
    } catch (error) {
      this.handleNotFoundError(error)
      return []
    }
  }

  async getCommitsByUserAndDate (owner: string, repo: string, author: string, date: string): Promise<Commit[]> {
    try {
      const since = this.dateUtils.formatDateToIso({ date })
      const until = this.dateUtils.formatDateToIso({ date, formatEndDayTime: true })

      const { data } = await this.gitHubClient.repos.listCommits({ owner, repo, author, since, until })

      return data.map(({ commit }) => ({
        message: this.sanitizeCommitMessage(commit.message)
      }))
    } catch (error) {
      this.handleNotFoundError(error)
      return []
    }
  }

  private sanitizeCommitMessage = (message: string) => {
    if (!message.includes('\n')) return message

    return message.split('\n')[0]
  }

  private handleNotFoundError = (error: Error | any) => {
    if (error.status) {
      throw new RepositoryNotFoundError()
    }
  }
}
