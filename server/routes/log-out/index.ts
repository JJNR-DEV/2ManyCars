import { Router, Request, Response } from 'express';

const route = Router();

route.delete('/', (req: Request, res: Response) => {
    req.logOut();
    res.redirect('/');
})

export default route;