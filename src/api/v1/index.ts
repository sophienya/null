import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import variable from './variable';

const api = express.Router();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(methodOverride('_method'));

api.use('/variable', variable);

export default api;
