import express from 'express';
import variable from './variable';

const client = express.Router();

client.get(`/`, async (req, res) => { res.render('index') });
client.use('/variable', variable);

export default client;
