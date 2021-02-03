import express, { Application } from 'express';
import bodyParser from 'body-parser';

import routes from '../routes';
// import db from '../db';

const app: Application = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.use('/', express.static('../client/public'));

app.listen(port, () => console.log(`Server is running on port ${port}`));

// const getData = async () => {
//     // const response = await db(`INSERT INTO ManyCars.Offer_Ride (ride_from, ride_to)
//     //     VALUES ('Porto', 'Lisboa')
//     // `, []);

//     const response = await db(`SELECT * FROM ManyCars.Offer_Ride`, []);
//     console.log(response);
    
//     return response;
// }

// getData();