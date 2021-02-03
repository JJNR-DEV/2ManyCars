import { Router, Request, Response } from 'express';
import db from '../../db';
import { nameValidator, emailValidator, passwordValidator } from '../validators';

const route = Router();

route.post('/', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    console.log({ name, email, password });
    try {
        nameValidator(name);
        emailValidator(email);
        passwordValidator(password);

        const registerResponse = await db(`
            INSERT INTO ManyCars.Users (name, email, password)
            VALUES ($1, $2, $3)
        `, [name, email, password]);
        res.status(201).send(registerResponse);
    } catch(err) {
        console.log(`The error: ${err.message}`);
        switch (err.message) {
            case 'Name does not match the constraints':
                res.status(406).send(err.message);
                break;
            case 'Email does not match the constraints':
                res.status(406).send(err.message);
                break;
            case 'Password cannot have empty spaces':
                res.status(406).send(err.message);
                break;
            default:
                res.status(500).send(err.message);
        }
    }
})

export default route;