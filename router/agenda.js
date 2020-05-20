const express = require('express');
const {
    agendaById,
    agendaByUser,
    createAgenda
} = require('../controller/agenda')

const { requireSignin } = require('../controller/auth');
const { userById } = require('../controller/user');

const router = express.Router();

router.post("/:userId", requireSignin, createAgenda);

router.get('/:userId', requireSignin, agendaByUser);

router.param("userId", userById);

router.param("agendaId", agendaById);

module.exports = router;