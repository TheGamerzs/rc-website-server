//import { Op } from "sequelize";
import sequelize from "sequelize";

export const getActiveApplicants = (db) => {
    return db.applications.findAll({
        where: {
            [sequelize.Op.and]: [
                {
                    status: { [Op.ne]: "Hired" },
                },
                {
                    status: { [Op.ne]: "Rejected" },
                },
            ],
        },
    });
};
