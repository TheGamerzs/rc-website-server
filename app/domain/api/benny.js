import Entity from "../Entity.js";

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
