import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const variable = express.Router();

variable.get(`/`, async (req, res) => {
    let variables = await prisma.variable.findMany({ select: { key: true } });
    res.render('variable', { variables });
});

variable.get(`/:key`, async ({ params: { key } }, res) => {
    key = encodeURIComponent(key);
    let v = await prisma.variable.findOne({ where: { key } });
    res.render('variable-edit', { key, value: v?.value });
});

export default variable;
