const express = require('express');
const router = express.Router();
const controller = require('../controllers/battleController');

//============================================================================================================================
/* section b: q8*/
router.post('/user/:user1_id/spellsUsed1/:spell1_id/user/:user2_id/spellUsed2/:spell2_id/battle', controller.checkIfUserOwnSpells, controller.startBattle, controller.getWinnerHouse, controller.getWinnerNameById, controller.updateHousePoints);

module.exports = router; 