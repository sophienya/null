import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const variable = express.Router();

variable.get(`/`, async (req, res) => {
    res.json(await prisma.variable.findMany({
        select: { key: true }
    }));
});

variable.get(`/:key`, async ({ params: { key } }, res) => {
    key = encodeURIComponent(key);
    let v = await prisma.variable.findOne({ where: { key } });
    res.json(v?.value);
});

variable.post(`/:key`, async (req, res, next) => {
    try {
        let key = encodeURIComponent(req.params.key);
        let value = null;
        if (req.is('json')) value = req.body;
        else value = JSON.parse(req.body.value);

        let v = await prisma.variable.upsert({
            where: { key },
            create: { key, value },
            update: { value }
        });
        res.json(v.value)
    } catch (error) {
        next('Error updating variable')
    }
});

variable.delete(`/:key`, ({ params: { key } }, res, next) => {
    key = encodeURIComponent(key);
    prisma.variable.delete({ where: { key } })
        .then(v => res.json(v))
        .catch(() => next('Variable not found'))
});

export default variable;
