export const RankedMembersType = `
    {
        id: Int!
        rank: Int!
        discord_id: String!
        in_game_name: String!
        in_game_id: Int!
        company: String!
        last_turnin: Date
        vouchers_turned_in: Int!
        pigs: PigsCashout!
        rts: RtsCashout!
    }
`;

//import { sequelize.Op } from 'sequelize';
import sequelize from "sequelize";

export const getPaginatedMemberRankings = (db, args, user, recursive) => {
    return db.members
        .findAndCountAll({
            include: [
                {
                    model: db.rts,
                    as: "rts",
                },
                {
                    model: db.pigs,
                    as: "pigs",
                },
            ],
            attributes: [
                "id",
                "discord_id",
                "in_game_name",
                "in_game_id",
                "company",
                "last_turnin",
                [
                    db.sequelize.literal(
                        "(SELECT `rank` FROM (SELECT `members`.`id`, (RANK() OVER (ORDER BY (`rts`.`vouchers` + `pigs`.`vouchers`) DESC)) AS `rank` FROM `members` AS `members` LEFT OUTER JOIN `rts` AS `rts` ON `members`.`id` = `rts`.`member_id` LEFT OUTER JOIN `pigs` AS `pigs` ON `members`.`id` = `pigs`.`member_id`) `r` WHERE `r`.`id`=`members`.`id`)"
                    ),
                    "rank",
                ],
            ],
            order: [[db.sequelize.literal("`rank`"), "ASC"]],
            limit: args.limit ? args.limit : 10,
            offset: args.offset < 0 ? 0 : args.offset,
            where: args.textFilter
                ? {
                      [sequelize.Op.or]: [
                          {
                              discord_id: {
                                  [sequelize.Op.like]: `%${args.textFilter}%`,
                              },
                          },
                          {
                              in_game_name: {
                                  [sequelize.Op.like]: `%${args.textFilter}%`,
                              },
                          },
                          {
                              in_game_id: {
                                  [sequelize.Op.like]: `%${args.textFilter}%`,
                              },
                          },

                          {
                              "$rts.vouchers$": {
                                  [sequelize.Op.like]: `%${args.textFilter}%`,
                              },
                          },
                          {
                              "$pigs.vouchers$": {
                                  [sequelize.Op.like]: `%${args.textFilter}%`,
                              },
                          },
                          {
                              company: {
                                  [sequelize.Op.like]: `%${args.textFilter}%`,
                              },
                          },
                      ],
                  }
                : true,
        })
        .then((result) => {
            const response = [];
            const rows = result.rows;

            if (rows.length == 0 && result.count > 0 && !recursive) {
                const lastPage = Math.floor(result.count / args.limit);
                return getPaginatedMemberRankings(
                    db,
                    { ...args, offset: lastPage },
                    user,
                    true
                );
            }

            for (let i = 0; i < rows.length; i++) {
                response.push({
                    id: rows[i].dataValues.id,
                    rank: rows[i].dataValues.rank,
                    discord_id: rows[i].dataValues.discord_id,
                    in_game_name: rows[i].dataValues.in_game_name,
                    in_game_id: rows[i].dataValues.in_game_id,
                    company: rows[i].dataValues.company,
                    last_turnin:
                        rows[i].dataValues.id == user.member_id
                            ? rows[i].dataValues.last_turnin
                            : null,
                    vouchers_turned_in:
                        rows[i].rts.vouchers + rows[i].pigs.vouchers,

                    pigs: rows[i].pigs,
                    rts: rows[i].rts,
                });
            }

            return { rows: response, count: result.count };
        })
        .catch((err) => {
            console.log(err);
        });
};
