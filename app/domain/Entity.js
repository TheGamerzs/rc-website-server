import { errorResponse, successResponse } from "../http/standardResponses.js";

export default class Entity {
    db;
    app;
    errorResponse;
    successResponse;
    api;
    constructor(db, app, api) {
        this.db = db;
        this.app = app;
        this.errorResponse = errorResponse;
        this.successResponse = successResponse;
        this.api = api;
    }
}
