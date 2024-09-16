import fs from "fs";
import path, { dirname } from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
import sequelizeConfigs from "../configs/sequelize.js";
const sequelizeConfig = sequelizeConfigs[env];

const db = {};

let sequelize;
if (sequelizeConfig.use_env_variable) {
    sequelize = new Sequelize(
        process.env[sequelizeConfig.use_env_variable],
        config
    );
} else {
    sequelize = new Sequelize(
        sequelizeConfig.database,
        sequelizeConfig.username,
        sequelizeConfig.password,
        { ...sequelizeConfig, logging: false }
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    })
    .forEach(async (file) => {
        const model = await import("./" + file);

        const [filename] = file.split(".");

        db[filename] = model.default(sequelize, Sequelize.DataTypes);
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
