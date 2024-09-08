const AppConfigs = {
    server_order: [
        "http://tycoon-2epova.users.cfx.re/status",
        "http://tycoon-njyvop.users.cfx.re/status",
    ],
    permissions: {
        OWNER: 3,
        MANAGER: 2,
        MEMBER: 1,
        GUEST: 0,
    },
    ttpermissions: {
        ADMIN: 3,
        SEARCH_ALL: 2,
        SEARCH_OTHERS: 0,
        SEE_SELF: 0,
        UNLINKED: -1,
    },
    CEOID: "404650985529540618",
    CTOID: "330000865215643658",
    token_max_age: 1209600,
};

AppConfigs.server_id_map = {
    main: AppConfigs.server_order[0],
    beta: AppConfigs.server_order[1],
};

// CFX Links
//   S2: https://tycoon-2epova.users.cfx.re/
//   S5: https://tycoon-njyvop.users.cfx.re/

export default AppConfigs;
