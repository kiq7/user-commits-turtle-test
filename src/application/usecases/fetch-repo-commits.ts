import { RepositoryStats, UsersDateCommit } from '../repositories/repository-info'

interface Params {
  owner: string
  repo: string
  since: string
  until: string
}

export class FetchRepoCommits {
  constructor (private readonly repositoryInfo: RepositoryStats) { }

  async execute (params: Params): Promise<UsersDateCommit[]> {
    const { owner, repo } = params
    const { since, until } = this.getFilterDate({ since: params.since, until: params.until })

    return this.repositoryInfo.getCommits(owner, repo, since, until)
  }

  private getFilterDate ({ since, until }: Pick<Params, 'since' | 'until'>) {
    const shouldCreateLastWeekDate = !since && !until

    if (shouldCreateLastWeekDate) {
      return this.getLastWeekDays()
    }

    return {
      since,
      until
    }
  }

  private getLastWeekDays () {
    const until = new Date()
    const since = new Date()

    since.setDate(until.getDate() - 7)

    return {
      until: until.toISOString().split('T')[0],
      since: since.toISOString().split('T')[0]
    }
  }
}
