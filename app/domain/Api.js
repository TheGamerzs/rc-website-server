import Auth from "./api/auth.js";
import Alfred from "./api/alfred.js";
import Tycoon from "./api/tycoon.js";
import Troll from "./api/troll.js";
import Benny from "./api/benny.js";
import Applications from "./api/applications.js";
import Management from "./api/management.js";
import Payout from "./api/payout.js";

export default class Api {
    Auth;
    Alfred;
    Tycoon;
    Troll;
    Benny;
    Applications;
    Management;
    Payout;
    constructor(db, app) {
        this.Auth = new Auth(db, app, this);
        this.Alfred = new Alfred(db, app, this);
        this.Tycoon = new Tycoon(db, app, this);
        this.Troll = new Troll(db, app, this);
        this.Benny = new Benny(db, app, this);
        this.Applications = new Applications(db, app, this);
        this.Management = new Management(db, app, this);
        this.Payout = new Payout(db, app, this);
    }
}
