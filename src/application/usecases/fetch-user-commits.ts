import { MissingParamError } from '../errors/missing-param-error'
import { RepositoryStats } from '../repositories/repository-info'

interface Params {
  owner: string
  repo: string
  date: string
  author: string
}

interface Response {
  commit: {
    message: string
  }
}

export class FetchUserCommits {
  constructor (private readonly repositoryInfo: RepositoryStats) { }

  async execute (params: Params): Promise<Response[]> {
    const requiredParams = ['author', 'date']

    requiredParams.forEach(param => {
      if (!params[param]) {
        throw new MissingParamError(param)
      }
    })

    const { owner, repo, author, date } = params
    const commits = await this.repositoryInfo.getCommitsByUserAndDate(owner, repo, author, date)

    return commits.map(commit => ({
      commit: {
        message: commit.message
      }
    }))
  }
}
