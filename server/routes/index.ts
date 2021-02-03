import { Router } from 'express';

import offerRide from './offer-ride';
import register from './register';
import login from './log-in';

const routes = Router();

routes.use('/offer-ride', offerRide);
routes.use('/forms/register.html', register);
routes.use('/forms/log-in.html', login);

export default routes;