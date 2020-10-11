import { Request, Response } from 'express'
import { MissingParamError } from '../../../application/errors/missing-param-error'
import { RepositoryNotFoundError } from '../../../application/errors/repository-not-found-error'
import { FetchRepoCommits } from '../../../application/usecases/fetch-repo-commits'
import { FetchUserCommits } from '../../../application/usecases/fetch-user-commits'

export class RepositoryController {
  constructor (
    private readonly fetchRepoCommits: FetchRepoCommits,
    private readonly fetchUserCommits: FetchUserCommits
  ) { }

  public async getCommits (req: Request, res: Response) {
    try {
      const { owner, repo } = req.params
      const { since, until } = req.query as { since: string, until: string }

      const response = await this.fetchRepoCommits.execute({ owner, repo, since, until })
      return res.status(200).json(response)
    } catch (error) {
      this.handleError(error, res)
    }
  }

  public async getUserCommits (req: Request, res: Response) {
    try {
      const { owner, repo } = req.params
      const { date, author } = req.query as { date: string, author: string }

      const response = await this.fetchUserCommits.execute({ owner, repo, author, date })
      return res.status(200).json(response)
    } catch (error) {
      this.handleError(error, res)
    }
  }

  private handleError = (error: Error, res: Response) => {
    if (error instanceof MissingParamError) {
      return res.status(400).json({
        error: error.message
      })
    }

    if (error instanceof RepositoryNotFoundError) {
      return res.status(404).json({
        error: error.message
      })
    }

    return res.status(500).json({
      error: 'internal server error'
    })
  }
}
