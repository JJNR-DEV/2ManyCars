import { Router, Request, Response } from 'express';
// import path from 'path';

const route = Router();

route.get('/', (req: Request, res: Response) => {
    // console.log(path.join(__dirname + 'offer-ride.html'));
    // res.status(200).sendFile('public/forms/offer-ride.html');
    return;
});

export default route;