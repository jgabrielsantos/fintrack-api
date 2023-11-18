import { AwsCognitoIdentityProvider } from "awesome-rtk"
import { environment } from "../../../config/environment"

export const provider = () => new AwsCognitoIdentityProvider({
  region: environment.aws.region,
  accessKeyId: environment.aws.accessKey,
  secretAccessKey: environment.aws.secretAccessKey,
  clientId: environment.aws.cognito.clientId
})
