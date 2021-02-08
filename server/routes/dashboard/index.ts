import { NextFunction, Request, Response, Router } from 'express'

const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/forms/log-in.html')
    }
};

const route = Router();

route.get('/', checkAuthenticated, (req: Request, res: Response) => {
    console.log('Dashboard');
    res.status(200).render('dashboard/index.html');
});

export default route;