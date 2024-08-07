import accessHistory from "../index";
import AppConfigs from "../../../configs/app_configs";

const length = 32;
const chars = "abcdefghijkmnopqrstuvwxyz023456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const createUserAccessToken = () => {
    let token = "";

    for (let i = 1; i <= length; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }

    if (accessHistory[token]) {
        return createUserAccessToken();
    }

    return { token: token, expires_in: AppConfigs.token_max_age };
};
