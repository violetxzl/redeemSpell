
const model = require("../models/battleModel");

//============================================================================================================================
/* 8. get into battles with other users */

  /*#################################### middleware #######################################*/

// check if users owns spell + retrieve skillpoints for each spell user used
module.exports.checkIfUserOwnSpells = (req, res, next) => {
    const data = {
      user1_id: req.params.user1_id,
      spell1_id: req.params.spell1_id,
      user2_id: req.params.user2_id,
      spell2_id: req.params.spell2_id,
    };
  
    const callback = (error, results) => {
      if (error) {
        console.error("Error in checkUserSpells:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
      }

      //if user does not own spell: forbidden 
      if (results.length < 2) {
        return res.status(403).json("Error: One or both users do not own the specified spells.");
      }
      // skillpoints for spells used
      const points1 = results[0].skillpoints_required;
      const points2 = results[1].skillpoints_required;
  
      // Store data in res.locals for the next controller
      res.locals.user1_id = data.user1_id;
      res.locals.user2_id = data.user2_id;
      res.locals.spell1_id = data.spell1_id;
      res.locals.spell2_id = data.spell2_id;
      res.locals.points1 = points1;
      res.locals.points2 = points2;
  
      next();
    };
  
    model.checkIfUserOwnSpells(data, callback);
  };
  
    /*#################################### middleware #####################################*/
  
  // battle time, compare which user's spell used required more skillpoints
  module.exports.startBattle = (req, res, next) => {
    const data = {
      points1: res.locals.points1,
      points2: res.locals.points2,
      user1_id: res.locals.user1_id,
      user2_id: res.locals.user2_id,
      spell1_id: res.locals.spell1_id,
      spell2_id: res.locals.spell2_id
    };
  
    let winner_id;
    //user 1's spell has more skillpoints
    if (data.points1 > data.points2) {
        winner_id = data.user1_id;
    } //user 2's spell has more skillpoints
    else if (data.points1 < data.points2) {
        winner_id = data.user2_id;
    } //both user used the same spell, tie
    else {
        return res.status(409).json({ message: "Battle ended in a tie. No winner determined. Try other spells ! " });
    }

    //declaring winner 
    data.winner_id = winner_id;

    const callback = (error, results) => {
      if (error) {
        console.error("Error inserting battle:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
      }
  
      // Save winner ID in res.locals
      res.locals.winner_id = winner_id;
      res.locals.battle_id = results.insertId; 
      next();
    };
  
    model.startBattle(data, callback);
  };

  /*#################################### middleware #######################################*/

  // getting the winner's house to add points 
  module.exports.getWinnerHouse = (req, res, next) => {
    const data = {
      winner_id: res.locals.winner_id,
      battle_id: res.locals.battle_id
    };
  
    const callback = (error, results) => {
      if (error) {
        console.error("Error retrieving winner's house:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
      }

      //winner does not have a house 
      if (results.length === 0) {
        return res.status(404).json({
          message: "Winner's house not found",
        });
      }
      res.locals.winner_id = data.winner_id
      res.locals.house_name = results[0].house_name
      res.locals.battle_id = data.battle_id
      next();
    };

  
    model.getWinnerHouse(data, callback);
  };


    /*#################################### middleware #######################################*/

  //get winner's name by its id for announcement 
module.exports.getWinnerNameById = (req, res, next) => {
  const data = {
    winner_id: res.locals.winner_id,
    house_name: res.locals.house_name,
    battle_id: res.locals.battle_id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getWinnerNameById:", error);
      res.status(500).json(error);
    }
    res.locals.winner_id = data.winner_id
    res.locals.house_name = data.house_name
    res.locals.battle_id = data.battle_id
    res.locals.winner_name = results[0].username
    next()
  };

  model.getWinnerNameById(data, callback);
};


  // adding 100 points to the winner's house + announcement 
  module.exports.updateHousePoints = (req, res, next) => {
    const data = {
      winner_id: res.locals.winner_id,
      house_name: res.locals.house_name,
      battle_id: res.locals.battle_id,
      winner_name: res.locals.winner_name,
      pointsAwarded: 100,
    };
  
    const callback = (error, results) => {
      if (error) {
        console.error("Error updating house points:", error);
        return res.status(500).json(error);
      } else {
        if (results.affectedRows === 0) {
          return res.status(404).json({
            message: "House not found",
          });
        } 
        //displaying the output: showing the winner's name, showing the house and showing the users how many points has been added
        else {
          return res.status(201).json({
            message: "battle completed !",
            battle_id: data.battle_id,
            results: `congrats to wizard ${data.winner_name}, from house ${data.house_name} , ${data.pointsAwarded} has been added to your house`
          });
        }
      }
    };
  
    model.updateHousePoints(data, callback);
  };

