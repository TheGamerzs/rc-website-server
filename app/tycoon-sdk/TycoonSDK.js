import Sdk from "./lib/sdk.js";
import AppConfigs from "../configs/app_configs.js";
import Server from "./api/Server.js";
import Player from "./api/Player.js";
import Data from "./api/Data.js";
import Utility from "./api/Utility.js";

const sdkConfigs = {
    key: process.env.TYCOON_KEY,
    server_order: AppConfigs.server_order,
};

class TycoonSDK extends Sdk {
    Server;
    Player;
    Data;
    Utility;

    constructor() {
        super(sdkConfigs);

        this.Server = new Server(this.apiCall);
        this.Player = new Player(this.apiCall);
        this.Data = new Data(this.apiCall);
        this.Utility = new Utility(this.apiCall);
    }
}

const instance = new TycoonSDK();

export default instance;
