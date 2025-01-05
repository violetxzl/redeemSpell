const express = require("express"); //need express file for this
const router = express.Router(); //when router.smt is used, this will b needed

/* adding routes */
// const userRoutes = require("../routes/userRoutes");
const redeemSpellRoutes = require("../routes/redeemSpellRoutes")
const battleRoutes = require("../routes/battleRoutes")

/* linking the routes */
// router.use("/user", userRoutes);
router.use("/spells", redeemSpellRoutes)
router.use("/battle", battleRoutes)




module.exports = router;