import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { environment } from "../../config/environment";

const plaidConfiguration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': environment.plaid.clientId,
      'PLAID-SECRET': environment.plaid.secret,
    },
  },
});

export const plaidClientProvider = new PlaidApi(plaidConfiguration);
