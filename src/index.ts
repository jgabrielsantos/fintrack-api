import { log } from "console";
import server from "./Main/server";
import { environment } from "./config/environment";

server.listen(environment.api.port, async () => {
  log(`
    Project: ${environment.api.project}
    Server port: ${environment.api.port}

    Environment: ${environment.api.environment}
  `)
})