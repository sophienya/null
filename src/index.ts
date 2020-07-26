require('dotenv').config();
import express, { Application } from 'express';
import { Liquid } from 'liquidjs';
import path from 'path';
import v1 from './api/v1';
import client from './client';

const app: Application = express();
const liquid = new Liquid();

liquid.registerFilter('jsonpretty', v => JSON.stringify(v, undefined, 2))

app.use('/api/v1', v1);
app.use('/api', v1);
app.use('/', client);

app.engine('liquid', liquid.express()); 
app.set('views', path.join(__dirname, 'client/views')); 
app.set('view engine', 'liquid'); 

const { PORT = '3000' } = process.env;
app.listen(PORT, () => console.log('Listening on port', PORT));
