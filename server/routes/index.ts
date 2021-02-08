import { Router } from 'express';

import offerRide from './offer-ride';
import searchRide from './search-ride';
import register from './register';
import login from './log-in';
import logout from './log-out';
import dashboard from './dashboard';

const routes = Router();

routes.use('/forms/offer-ride.html', offerRide);
routes.use('/forms/search-ride.html', searchRide);
routes.use('/forms/register.html', register);
routes.use('/forms/log-in.html', login);
routes.use('/forms/log-out.html', logout);
routes.use('/dashboard/index.html', dashboard);

export default routes;