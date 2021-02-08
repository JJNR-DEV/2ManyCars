import { Strategy } from 'passport-local';
import { Passport, use, serializeUser, deserializeUser } from 'passport';
import { compare } from 'bcrypt';

const initialize = (passport: typeof Passport, getUserByEmail: Function, getUserByID: Function) => {
    const authenticateUser = async (email: String, password: String, done: Function) => {
        const result = await getUserByEmail(email);
        const user = result[0];

        if(user === null) {
            return done(null, false, { message: 'No user found with that email' });
        }
        
        try {
            if(await compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password did not match' });
            }
        } catch(e) {
            return done(e);
        }
    };

    use(new Strategy({ usernameField: 'email' }, authenticateUser));

    
    serializeUser((user: any, done: Function) => { 
        return done(null, user.id);
    });

    deserializeUser(async(id: number, done: Function) => { 
        const getUser = await getUserByID(id);
        return done(null, getUser);
    });
}

export default initialize;