const model = require("../models/redeemSpellModel");


//============================================================================================================================
// 6. user redeems a spell
//checking if user has enough skillpoints to redeem 
module.exports.checkIfCanRedeem = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
    spell_id: req.params.spell_id,
  };

  const callback = (error, results) => {
    if (error) {
      console.error("Error in validateRedeemRequest:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }

    if (results.length === 0) {
      return res.status(400).json("Error: Spell or user not found");
    }

    const skillpoints = results[0].skillpoints;
    const skillpoints_required = results[0].skillpoints_required;
    const name = results[0].name;
    const spell_id = results[0].spell_id;

    if (skillpoints < skillpoints_required) {
      return res.status(400).json("Error: Insufficient points to redeem spell");
    }

    // Passing to next controller if user has enough skillpoints
    res.locals.skillpoints = skillpoints
    res.locals.spell_name = name;
    res.locals.spell_id = spell_id;
    res.locals.skillpoints_required = skillpoints_required;
    res.locals.user_id = req.params.user_id;
    next();
  };

  model.checkIfCanRedeem(data, callback);
};

//checking if user already owns the spell

module.exports.checkIfUserOwnSpell = (req, res, next) => {
  const data = {
    skillpoints: res.locals.skillpoints,
    spell_name: res.locals.spell_name,
    user_id: res.locals.user_id,
    spell_id: res.locals.spell_id,
    skillpoints_required: res.locals.skillpoints_required,
  }


  const callback = (error, results, fields) => {
      if (error) {
          console.error("Error checkIfUserOwnSpell", error);
          return res.status(500).json({ message: "Internal server error." });
      }


      if (results.length > 1 ) {
          return res.status(409).json({ message: "you already own this spell !!! redeem another spell" });
      }

      // Store in res.locals 
      res.locals.skillpoints = data.skillpoints
      res.locals.spell_name = data.spell_name;
      res.locals.skillpoints_required = data.skillpoints_required;
      res.locals.user_id = data.user_id;

      next(); 
  };

  
  model.checkIfUserOwnSpell(data, callback);  
};


// Redeem the spell (Insert into UserSpells table)
module.exports.redeemSpell = (req, res, next) => {
  const data = {
    skillpoints: res.locals.skillpoints,
    spell_name: res.locals.spell_name,
    user_id: res.locals.user_id,
    spell_id: res.locals.spell_id,
    skillpoints_required: res.locals.skillpoints_required,
  };

  const callback = (error) => {
    if (error) {
      console.error("Error redeeming spell:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }

//store into res.locals
    res.locals.skillpoints = data.skillpoints
    res.locals.spell_name = data.spell_name;
    res.locals.skillpoints_required = data.skillpoints_required;
    res.locals.user_id = data.user_id;
    next();
  };

  model.redeemSpell(data, callback);
};

// Deducting skill points from user table (update)

module.exports.updateSkillpoints = (req, res) => {
  const data = {
    newSkillpoints:res.locals.skillpoints - res.locals.skillpoints_required,
    spell_name: res.locals.spell_name,
    user_id: res.locals.user_id,
    skillpoints_required: res.locals.skillpoints_required,
  };

  const callback = (error) => {
    if (error) {
      console.error("Error updating skill points:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }

    res.status(201).json({
      message: "Spell redeemed successfully",
      spell_name: res.locals.spell_name,
      new_skillpoints: data.newSkillpoints, // Returning new skillpoints
    });
  };

  model.updateSkillpoints(data, callback);
};