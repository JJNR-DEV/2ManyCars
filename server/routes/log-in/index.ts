import { Request, Response, Router } from 'express';
import { emailValidator, passwordValidator } from '../validators';
import db from '../../db';

const route = Router();

route.post('/', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        emailValidator(email);
        passwordValidator(password);

        const response = await db(`
            SELECT email, password 
            FROM ManyCars.Users 
            WHERE email = $1 AND password = $2
        `, [email, password]);

        if(response.length === 0) {
            throw Error('There is no record in the database of such credentials');
        } else {
            res.redirect(307, '/index.html')
        }
    } catch(err) {
        console.log(`This is the error received: ${err.message}`);
        res.status(500).send(`This is the error received: ${err.message}`)
    }
});

export default route;