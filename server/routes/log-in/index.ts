import { Router, Request, Response, NextFunction } from 'express';
import { Passport, authenticate } from 'passport';

import { emailValidator, passwordValidator } from '../validators';
import db from '../../db';
import initialize from '../../passportConfig';

initialize(
    Passport, 
    async (email: String) => {
        try {
            const response = await db(`
                SELECT *
                FROM ManyCars.Users 
                WHERE email = $1
            `, [email]);

            return response;
        } catch(err) {
            console.log(`This is the error received: ${err.message}`);
            return;
        }
    },
    async (id: number) => {
        try {
            const response = await db(`
                SELECT *
                FROM ManyCars.Users 
                WHERE id = $1
            `, [id]);

            return response[0];
        } catch(err) {
            console.log(`This is the error received: ${err.message}`);
            return;
        }
    }
);

const checkNotAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()) {
        console.log('isAuthenticated');
        return res.redirect('/dashboard/index.html');
    }

    next();
};

const route = Router();

route.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        emailValidator(email);
        passwordValidator(password);

        next();
    } catch(err) {
        res.status(400).send({ message: err.message });
    }
    
}, authenticate('local', { 
    successRedirect: '/dashboard/index.html',
    failureFlash: true
}));

route.get('/', checkNotAuthenticated, (req: Request, res: Response) => {
    res.status(200).render('forms/log-in.html');
});

export default route;