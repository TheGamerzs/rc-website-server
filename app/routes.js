import Api from './domain/Api';
import AppConfigs from './configs/app_configs';
import { authenticateRoute } from './domain/auth/resolvers/authenticateResolver';
import { sendStaffNotfication } from './http/log';
import { unauthorizedResponse } from './http/standardResponses';

export const routes = (db, app) => {
	const api = new Api(db, app);

	app.get('/api/callback', async (req, res) => {
		api.Auth.login(req, res);
	});

	app.get('/api/auth/logout', async (req, res) => {
		api.Auth.logout(req, res);
	});

	app.get('/api/alfred/restart', async (req, res) => {
		try {
			authenticateRoute(
				{ app: [AppConfigs.permissions.OWNER, AppConfigs.permissions.MANAGER] },
				req,
				() => api.Alfred.restart(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

	app.get('/api/tycoon/positions/:server', async (req, res) => {
		try {
			authenticateRoute(
				{
					tt: [
						AppConfigs.ttpermissions.ADMIN,
						AppConfigs.ttpermissions.SEARCH_ALL,
						AppConfigs.ttpermissions.SEARCH_OTHERS,
						AppConfigs.ttpermissions.SEE_SELF
					]
				},
				req,
				() => api.Tycoon.getPositions(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

	app.get('/api/tycoon/data', async (req, res) => {
		if (!req.user || !req.user.in_game_id) return unauthorizedResponse(res);

		api.Tycoon.getData(req, res);
	});

	app.get('/api/tycoon/rts/currentvehicles', async (req, res) => {
		if (!req.user || !req.user.in_game_id) return unauthorizedResponse(res);

		api.Tycoon.getCurrentRTSVehicles(req, res);
	});

	app.get('/api/tycoon/biz', async (req, res) => {
		if (!req.user || !req.user.in_game_id) return unauthorizedResponse(res);

		api.Tycoon.getBiz(req, res);
	});

	//player backpack
	app.get('/api/tycoon/backpack', async (req, res) => {
		if (!req.user || !req.user.in_game_id) return unauthorizedResponse(res);

		api.Tycoon.getBackpack(req, res);
	});

	app.get('/api/tycoon/players/:server', async (req, res) => {
		api.Tycoon.getPlayers(req, res);
	});

	app.get('/api/hire', function (req, res) {
		api.Troll.hire(req, res);
	});

	app.get('/api/benny/list', function (req, res) {
		try {
			authenticateRoute(
				{
					app: [
						AppConfigs.permissions.OWNER,
						AppConfigs.permissions.MANAGER,
						AppConfigs.permissions.MEMBER
					]
				},
				req,
				() => api.Benny.getList(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

	app.get('/api/benny/search', function (req, res) {
		try {
			authenticateRoute(
				{
					app: [
						AppConfigs.permissions.OWNER,
						AppConfigs.permissions.MANAGER,
                        AppConfigs.permissions.MEMBER,
                    ],
				},
				req,
				() => api.Benny.search(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

	app.get('/api/tycoon/key', function (req, res) {
		try {
			authenticateRoute({ tt: [AppConfigs.ttpermissions.ADMIN] }, req, () =>
				api.Tycoon.getCharges(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

	app.get('/api/applicant/:uid/details', function (req, res) {
		try {
			authenticateRoute(
				{ app: [AppConfigs.permissions.OWNER, AppConfigs.permissions.MANAGER] },
				req,
				() => api.Applications.details(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

	app.post('/api/member/hire', function (req, res) {
		if (!req.user) return unauthorizedResponse(res);

		if (req.user.welcome == 0 && req.user.permission == 1) {
			res.redirect('http://secret.rockwelltransport.com');
			return sendStaffNotfication(
				`This dummy ${req.user.username}#${req.user.discriminator} (<@${
					req.user.id
				}>) AKA ${req.body.name} (${
					req.body.member
				}) just tried to get back into ${req.body.company.toUpperCase()} even tho we said he wasn't allowed to.`
			);
		}

		if (req.user.permission < 2) {
			if (req.user.welcome == 1 && req.user.permission == 1) {
				req.body.discord = req.user.id;
				req.body.name = req.user.in_game_name;
				req.body.member = req.user.in_game_id;
			} else {
				return unauthorizedResponse(res);
			}
		}

		api.Management.hire(req, res);
	});

	app.post('/api/payout/calculate', function (req, res) {
		try {
			authenticateRoute(
				{ app: [AppConfigs.permissions.OWNER, AppConfigs.permissions.MANAGER] },
				req,
				() => api.Payout.calculate(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

	app.post('/api/payout/confirm', function (req, res) {
		try {
			authenticateRoute(
				{ app: [AppConfigs.permissions.OWNER, AppConfigs.permissions.MANAGER] },
				req,
				() => api.Payout.confirm(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

	app.get('/api/payout/calculate', function (req, res) {
		try {
			authenticateRoute(
				{
					app: [
						AppConfigs.permissions.OWNER,
						AppConfigs.permissions.MANAGER,
						AppConfigs.permissions.MEMBER
					]
				},
				req,
				() => api.Payout.getDetails(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

	app.patch('/api/manager/pay', function (req, res) {
		try {
			authenticateRoute({ app: [AppConfigs.permissions.OWNER] }, req, () =>
				api.Management.pay(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

	app.get('/api/tycoon/id', function (req, res) {
		try {
			authenticateRoute(
				{
					app: [
						AppConfigs.permissions.OWNER,
						AppConfigs.permissions.MANAGER,
						AppConfigs.permissions.MEMBER,
                        AppConfigs.permissions.GUEST,
                    ],
				},
				req,
				() => api.Tycoon.getId(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

	app.get('/api/discord', function (req, res) {
		try {
			authenticateRoute({ app: [AppConfigs.permissions.GUEST] }, req, () =>
				api.Applications.isInDiscord(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

	app.post('/api/apply', function (req, res) {
		try {
			authenticateRoute({ app: [AppConfigs.permissions.GUEST] }, req, () =>
				api.Applications.apply(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

	app.post('/api/publickey', function (req, res) {
		try {
			authenticateRoute(
				{
					app: [
						AppConfigs.permissions.Owner,
						AppConfigs.permissions.MANAGER,
						AppConfigs.permissions.MEMBER
					]
				},
				req,
				() => api.Auth.setPublicKey(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

    app.post("/api/publickey", function (req, res) {
        if (!req.user || !req.user.in_game_id) return unauthorizedResponse(res);

        api.Auth.setPublicKey(req, res);
    });

    app.get("/api/tycoon/storages", function (req, res) {
		try {
			authenticateRoute(
				{
					app: [
						AppConfigs.permissions.OWNER,
						AppConfigs.permissions.MANAGER,
						AppConfigs.permissions.MEMBER,
                        AppConfigs.permissions.GUEST,
                    ],
				},
				req,
				() => api.Tycoon.getStorages(req, res)
			);
		} catch (e) {
			return unauthorizedResponse(res);
		}
	});

	app.get('/api/tycoon/trunks', function (req, res) {
		if (!req.user || !req.user.in_game_id) return unauthorizedResponse(res);

		api.Tycoon.getTrunks(req, res);
	});

	app.get('/api/tycoon/currentvehicles', function (req, res) {
		if (!req.user || !req.user.in_game_id) return unauthorizedResponse(res);

		api.Tycoon.getCurrentVehicles(req, res);
	});

	return app;
};
