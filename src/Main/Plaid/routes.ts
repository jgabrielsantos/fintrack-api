import { Router } from "express";
import { tokenRoutes } from "./Tokens/routes";
import { authRoutes } from "./Auth/routes";
import { institutionRoutes } from "./Institutions/routes";
import { accountRoutes } from "./Accounts/routes";
import { transactionRoutes } from "./Transactions/routes";

export const plaidRoutes = Router()

plaidRoutes.use('/account', accountRoutes)
plaidRoutes.use('/auth', authRoutes)
plaidRoutes.use('/institution', institutionRoutes)
plaidRoutes.use('/token', tokenRoutes)
plaidRoutes.use('/transactions', transactionRoutes)
