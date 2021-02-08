import express, { Application } from 'express';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import expressSession from 'express-session';
import { initialize, session } from 'passport';
import { renderFile } from 'ejs';

import routes from '../routes';

const app: Application = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(flash());
app.use(expressSession({
    secret: 'To  Remove',
    resave: false,
    saveUninitialized: false
}));
app.use(initialize());
app.use(session());

app.use(routes);
app.use('/', express.static('../client/public'));

app.set('views', '../client/public');
app.engine('html', renderFile);

app.listen(port, () => console.log(`Server is running on port ${port}`));