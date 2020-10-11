import { Router } from 'express'
import { RepositoryController } from './controllers/repository-controller'

export class Routes {
  private readonly _router: Router

  constructor (
    private readonly repositoryController: RepositoryController
  ) {
    this._router = Router()

    this.repositoryRoutes()
  }

  get router () {
    return this._router
  }

  repositoryRoutes = () => {
    this._router.get('/:owner/:repo/commits', (req, res) => this.repositoryController.getCommits(req, res))
    this._router.get('/:owner/:repo/commits/details', (req, res) => this.repositoryController.getUserCommits(req, res))
  }
}
