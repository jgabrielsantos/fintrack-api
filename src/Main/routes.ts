import { Request, Response, Router } from "express";
import { authRoutes } from "./Auth/routes";
import { signUpRoutes } from "./SignUp/routes";
import { passwordRoutes } from "./Password/routes";

export const routes = Router()

routes.get('/healthcheck', (_: Request, res: Response) => {
  res.status(200).json({
    status: 'Server running'
  })
})

routes.use('/v1/auth', authRoutes)
routes.use('/v1/signup', signUpRoutes)
routes.use('/v1/password', passwordRoutes)
