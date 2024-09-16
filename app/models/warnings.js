const init = (sequelize, DataTypes) => {
    const Warnings = sequelize.define(
        "warnings",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            member_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: false,
            },
            reason: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal(
                    "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                ),
            },
        },
        {
            freezeTableName: true,
        }
    );

    return Warnings;
};

export default init