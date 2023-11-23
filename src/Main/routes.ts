import { Request, Response, Router } from "express";
import { signUpRoutes } from "./SignUp/routes";
import { passwordRoutes } from "./Password/routes";
import { plaidRoutes } from "./Plaid/routes";
import { authRoutes } from "./Auth/Auth/routes";
import { refreshRoutes } from "./Auth/Refresh/routes";
import { settingsRoutes } from "./Settings/routes";

export const routes = Router()

routes.get('/healthcheck', (_: Request, res: Response) => {
  res.status(200).json({
    status: 'Server running'
  })
})

routes.use('/v1/auth', authRoutes)
routes.use('/v1/auth', refreshRoutes)
routes.use('/v1/signup', signUpRoutes)
routes.use('/v1/password', passwordRoutes)
routes.use('/v1/plaid', plaidRoutes)
routes.use('/v1/settings', settingsRoutes)
