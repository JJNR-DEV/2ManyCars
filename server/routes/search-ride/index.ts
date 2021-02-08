import { Router, Request, Response } from 'express';
import db from '../../db';
// import {} from '../validators';

const route = Router();

route.post('/', async (req: Request, res: Response) => {
    try {
        const { rideFrom, rideTo, peopleRide, date } = req.body;
        const response = await db(`
            INSERT INTO ManyCars.Searching_Ride (ride_from, ride_to, people_ride, date)
            VALUES ($1, $2, $3, $4)
        `, [rideFrom, rideTo, peopleRide, date]);
    
        console.log(response);
    
        res.status(201).send(response);
    } catch(err) {
        console.error(`This is the error: ${err}`);
        throw Error(err.message);
    }
});

export default route;