import dotenv from 'dotenv'
import { Octokit } from '@octokit/rest'

import { FetchRepoCommits } from './application/usecases/fetch-repo-commits'
import { FetchUserCommits } from './application/usecases/fetch-user-commits'
import { GitHubRepositoryInfo } from './infrastructure/repositories/github-repository-info'
import { RepositoryController } from './presentation/http/controllers/repository-controller'
import { Routes } from './presentation/http/routes'
import { Server } from './presentation/http/server'
import { DateUtils } from './utils/date-utils'

dotenv.config()
const main = async () => {
  // repositories
  const repo = new GitHubRepositoryInfo(new Octokit(), new DateUtils())

  // usecases
  const fetchRepoCommits = new FetchRepoCommits(repo)
  const fetchUserCommits = new FetchUserCommits(repo)

  // http
  const repositoryController = new RepositoryController(fetchRepoCommits, fetchUserCommits)
  const routes = new Routes(repositoryController)
  const server = new Server(routes)

  server.start()
    .catch(console.log)
}

main()
