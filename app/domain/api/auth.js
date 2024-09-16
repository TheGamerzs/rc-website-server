import Entity from "../Entity.js";
import Sdk from "../../tycoon-sdk/lib/sdk.js";
import { accessTokenResolver } from "../auth/resolvers/accessTokenResolver.js";
import { discordResolver } from "../auth/resolvers/discordResolver.js";
import { registerUser } from "../auth/registration/registerUser.js";
import { removeUser } from "../auth/index.js";
import { webUserResolver } from "../auth/resolvers/webUserResolver.js";

export default class Auth extends Entity {
    sdk = new Sdk();

    constructor(db, app, api) {
        super(db, app, api);
    }

    login = async (req, res) => {
        const { code } = req.query;

        try {
            const access = await accessTokenResolver(code).catch((err) => {
                res.redirect(process.env.FRONT_URL + "/home");
            });
            if (!access) return this.errorResponse(res, "Invalid access token");
            const discordUser = await discordResolver(access.access_token);
            const webUser = await webUserResolver(this.db, discordUser.id);

            const companyMember = await this.db.members.findOne({
                where: { discord_id: discordUser.id },
            });

            if (companyMember) {
                var companyManager = await this.db.managers.findOne({
                    where: { member_id: companyMember.id },
                });
            }
            const { token, user, expires_in } = registerUser(
                discordUser,
                webUser,
                companyMember ? companyMember.dataValues : null,
                companyManager
            );

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: expires_in * 1000,
            });

            res.redirect(process.env.FRONT_URL + "/home/profile");
        } catch (err) {
            console.error(err);
            this.errorResponse(res, err);
        }
    };

    logout = async (req, res) => {
        res.clearCookie("token");
        if (req.cookies["token"]) removeUser(req.cookies["token"]);
        return this.successResponse(res);
    };

    setPublicKey = async (req, res) => {
        const { public_key } = req.body;
        const { user } = req;

        if (!user) return this.errorResponse(res, "User not found");

        try {
            await this.db.website.update(
                { public_key: public_key },
                { where: { discord_id: user.id } }
            );

            this.sdk.setPublicKeyCache(user.id, public_key);
            return this.successResponse(res);
        } catch (err) {
            return this.errorResponse(res, err);
        }
    };
}
