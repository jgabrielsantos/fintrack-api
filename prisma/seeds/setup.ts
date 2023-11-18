import { seedPlans } from "./plans";
import { seedUsers } from "./users";

Promise.all([
  seedPlans(),
  seedUsers()
])