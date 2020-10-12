import express, { Application } from 'express'
import { Routes } from './routes'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../../../swagger.json'

export class Server {
  public express: Application

  constructor (
    private readonly routes: Routes
  ) {
    this.express = express()

    this.useMiddlewares()
    this.useRoutes()
  }

  private useMiddlewares (): void {
    this.express.use(express.json())
  }

  private useRoutes (): void {
    this.express.use(this.routes.router)
    this.express.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  }

  public start () {
    return new Promise(resolve => {
      const http = this.express.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT} 🚀`)
        resolve(http)
      })
    })
  }
}
