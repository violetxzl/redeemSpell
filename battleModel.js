const pool = require("../services/db");
  //============================================================================================================================

  /*9. users can battle */

// Get the spells of both users involved in the battle
module.exports.checkIfUserOwnSpells = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT Spells.spell_id, Spells.skillpoints_required
    FROM UserSpells
    INNER JOIN Spells ON UserSpells.spell_id = Spells.spell_id      -- Join to get spell details
    WHERE UserSpells.user_id IN (?, ?) 
    AND
     Spells.spell_id IN (?, ?);
  `;
  const VALUES = [data.user1_id, data.user2_id, data.spell1_id, data.spell2_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// Insert a battle into the database
module.exports.startBattle = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO Battles (user_1_id, user_2_id, winner_id, spell_used_1, spell_used_2)
    VALUES (?, ?, ?, ?, ?);
  `;
  const VALUES = [data.user1_id, data.user2_id, data.winner_id, data.spell1_id, data.spell2_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};


// Getting the winner's house
module.exports.getWinnerHouse = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT House.house_name
    FROM UserInfo
    INNER JOIN House ON UserInfo.house_name = House.house_name
    WHERE UserInfo.user_id = ?;
  `;

  const VALUES = [data.winner_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//getting winner's username
module.exports.getWinnerNameById = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT  * FROM user
    WHERE user_id = ?;  
    `; 
  const VALUES = [data.winner_id]; 

  pool.query(SQLSTATEMENT, VALUES, callback);
};



// Update house points for the winner
module.exports.updateHousePoints = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE House
    SET house_points = house_points + ?
    WHERE house_name = ?;
  `;
  const VALUES = [data.pointsAwarded, data.house_name];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

  //============================================================================================================================
