import express, { Application, NextFunction, Request, Response, json } from 'express'
import cors from 'cors'
import { routes } from './routes'

class Server {
  server: Application
  routeLog = (req: Request, _: Response, next: NextFunction) => {
    const { headers, originalUrl, method } = req
    const { log } = console
    const text = `Host: ${headers.host} - URL: ${originalUrl} - Method: ${method} - Agent: ${headers['user-agent']}`

    log(text)

    next()
  }

  constructor() {
    this.server = express()
    this.setup()
  }

  setup() {
    this.server.use(json())
    this.server.use(cors())
    this.server.use(this.routeLog)

    this.server.use((_: Request, res: Response, next: NextFunction) => {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000')
      next()
    })

    this.routes()
  }

  routes() {
    this.server.use(routes)
  }
}

export default new Server().server
