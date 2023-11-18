import { config } from "dotenv";

config()

export const environment = {
  api: {
    port: process.env.PORT || 8080,
    project: process.env.PROJECT,
    environment: process.env.ENVIRONMENT
  },
  aws: {
    region: process.env.AWS_REGION as string,
    accessKey: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    cognito: {
      clientId: process.env.AWS_COGNITO_CLIENT_ID as string,
      userPoolId: process.env.AWS_COGNITO_USER_POOL_ID as string
    }
  }
}
