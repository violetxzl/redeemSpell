const express = require('express');
const router = express.Router();

const userSpellsController = require('../controllers/redeemSpellController')

//============================================================================================================================
/* section b: q6*/
router.post('/:spell_id/user/:user_id/redeem', userSpellsController.checkIfCanRedeem, userSpellsController.checkIfUserOwnSpell, userSpellsController.redeemSpell, userSpellsController.updateSkillpoints)

module.exports = router;