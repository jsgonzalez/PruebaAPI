const express = require('express');
const {
    agendaById,
    agendaByUser,
    createAgenda,
    byId,
    deleteAgenda,
    updateAgenda
} = require('../controller/agenda')

const { requireSignin } = require('../controller/auth');
const { userById } = require('../controller/user');

const router = express.Router();

router.post("/:userId", requireSignin, createAgenda);

router.get('/:userId', requireSignin, agendaByUser);

router.get('/byId/:agendaId', requireSignin, byId);

router.put('/:agendaId', requireSignin, updateAgenda);

router.delete('/:agendaId', requireSignin, deleteAgenda);

router.param("userId", userById);

router.param("agendaId", agendaById);

module.exports = router;