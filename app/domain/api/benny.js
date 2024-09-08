import Entity from "../Entity";
const authentication = require("../sheets/authentication");
const { google } = require("googleapis");
import AppConfigs from "../../configs/app_configs";

export default class Benny extends Entity {
    constructor(db, app, api) {
        super(db, app, api);
    }

    getList = async (req, res) => {
        return this.errorResponse(res, "Not Implemented!");
    };

    search = async (req, res) => {
        return this.errorResponse(res, "Not Implemented!");
    };
}
