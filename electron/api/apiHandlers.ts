import * as allProjectsHandlers from "./allProjectsHandlers";
import * as projectDataHandlers from "./projectDataHandlers";

export const allHandlers = { ...allProjectsHandlers, ...projectDataHandlers };
