import { Application } from "./application";
import { config } from "./config";

const application = new Application(config);
application.run();
