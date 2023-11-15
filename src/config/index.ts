import { dirsCfg, DirsCfgInterface } from "./dirsCfg";
import { appCfg, AppCfgInterface } from "./appCfg";

export interface ConfigInterface extends DirsCfgInterface, AppCfgInterface {}

const config: ConfigInterface = {
    ...dirsCfg,
    ...appCfg,
};

export { config };
