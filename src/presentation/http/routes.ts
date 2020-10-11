import { Router } from 'express'

export class Routes {
  private readonly _router: Router

  constructor (
  ) {
    this._router = Router()

    this.repositoryRoutes()
  }

  get router () {
    return this._router
  }

  repositoryRoutes = () => {
    this._router.get('/turtle', (_req, res) => res.send('hello turtle :)'))
  }
}
