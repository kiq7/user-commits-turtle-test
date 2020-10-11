import dotenv from 'dotenv'
import { Routes } from './presentation/http/routes'
import { Server } from './presentation/http/server'

dotenv.config()
const main = async () => {
  const routes = new Routes()
  const server = new Server(routes)

  server.start()
    .catch(console.log)
}

main()
