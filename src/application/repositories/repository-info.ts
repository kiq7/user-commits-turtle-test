export interface UsersDateCommit {
  date: string
  users: {
    user: string
    commitCount: number
  }[]
}

export interface Commit {
  message: string
}

export interface RepositoryStats {
  getCommits(owner: string, repo: string, since: string, until: string): Promise<UsersDateCommit[]>
  getCommitsByUserAndDate(owner: string, repo: string, author: string, date: string): Promise<Commit[]>
}
