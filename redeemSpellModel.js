const pool = require("../services/db");

//============================================================================================================================
//6. redeem spell
// Check eligibility for redeeming the spell
module.exports.checkIfCanRedeem = (data, callback) => {
    const SQLSTATEMENT = `
      SELECT User.skillpoints, Spells.spell_id, Spells.name, Spells.skillpoints_required
      FROM User
      INNER JOIN Spells ON Spells.spell_id = ?
      WHERE User.user_id = ?;
    `;
    const VALUES = [data.spell_id, data.user_id];
  
    pool.query(SQLSTATEMENT, VALUES, callback);
  };


  //check if user already has the spell
  module.exports.checkIfUserOwnSpell= (data, callback) => {
    const SQLSTATEMENT = `
      SELECT * FROM userSpells
      WHERE user_id = ? AND spell_id = ? ;  
      `; 
    const VALUES = [data.user_id, data.spell_id]; 
  
    pool.query(SQLSTATEMENT, VALUES, callback);
  };

  
  // Redeem the spell by inserting into UserSpells table
  module.exports.redeemSpell = (data, callback) => {
    const SQLSTATEMENT = `
      INSERT INTO UserSpells (user_id, spell_id)
      VALUES (?, ?);
    `;
    const VALUES = [data.user_id, data.spell_id];
  
    pool.query(SQLSTATEMENT, VALUES, callback);
  };
  
  // Update user skill points after redeeming a spell
  module.exports.updateSkillpoints = (data, callback) => {
    const SQLSTATEMENT = `
      UPDATE User
      SET skillpoints = skillpoints - ?
      WHERE user_id = ?;
    `;
    const VALUES = [data.skillpoints_required, data.user_id];
  
    pool.query(SQLSTATEMENT, VALUES, callback);
  };
  
