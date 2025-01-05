const pool = require('../services/db')
const SQLSTATEMENT = 
`CREATE TABLE User ( 
    user_id INT AUTO_INCREMENT PRIMARY KEY, 
    username TEXT, 
    skillpoints INT 
   ); 
    
   CREATE TABLE FitnessChallenge ( 
       challenge_id INT AUTO_INCREMENT PRIMARY KEY, 
       creator_id INT NOT NULL, 
       challenge TEXT NOT NULL, 
       skillpoints INT NOT NULL 
   ); 
    
   CREATE TABLE UserCompletion ( 
       complete_id INT AUTO_INCREMENT PRIMARY KEY, 
       challenge_id INT NOT NULL, 
       user_id INT NOT NULL, 
       completed BOOL NOT NULL, 
       creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
       notes TEXT 
   );
   CREATE TABLE House (
    house_name VARCHAR(255) PRIMARY KEY, 
    house_points INT DEFAULT 0 
);
CREATE TABLE UserInfo (
    user_id INT PRIMARY KEY,
    house_name VARCHAR(255) NOT NULL
);


CREATE TABLE Spells (
    spell_id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    skillpoints_required INT NOT NULL
);


CREATE TABLE UserSpells (
    unique_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    spell_id INT,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Battles (
    battle_id INT AUTO_INCREMENT PRIMARY KEY,
    user_1_id INT,
    user_2_id INT,
    winner_id INT,
    spell_used_1 INT,
    spell_used_2 INT,
    battle_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO House (house_name, house_points) VALUES
('Poseidon', 0),
('Hades', 0),
('Hermes', 0),
('Athena', 0),
('Artemis', 0);

INSERT INTO Spells (name, description, skillpoints_required) VALUES
('Flammora', 'Sends a fiery blast to scorch enemies.', 500),
('Tempestas', 'Summons thunder and lightning to strike the target.', 450),
('Ignitus', 'Shoots a burst of fire from the wand.', 400),
('Volcarus', 'Creates a wave of molten lava or fire to burn enemies.', 350),
('Glaciore', 'Launches a shard of ice to freeze or damage the target.', 300),
('Ventus Strike', 'Unleashes a strong gust of wind to knock opponents down.', 250),
('Terravox', 'Sends rocks flying at the enemy from the ground.', 200),
('Aqualash', 'Sends a wave of water to knock enemies back.', 150),
('Sylpha', 'A small, sharp gust of wind to disorient or distract the enemy.', 50);

INSERT INTO user (username, skillpoints) VALUES
('test','1000)
('test2', 50000)

INSERT INTO User (username, skillpoints) VALUES ('user1', 1000), ('user2', 2000);
INSERT INTO House (house_name, house_points) VALUES ('Poseidon', 0), ('Hades', 0);
INSERT INTO UserInfo (user_id, house_name) VALUES (1, 'Poseidon'), (2, 'Hades');
INSERT INTO Spells (name, description, skillpoints_required) VALUES ('Flammora', 'Fiery blast', 500), ('Tempestas', 'Thunder strike', 450);
INSERT INTO UserSpells (user_id, spell_id) VALUES (1, 1), (2, 2);

UPDATE House SET house_points = 622 WHERE house_name = 'Poseidon';
UPDATE House SET house_points = 41 WHERE house_name = 'Hades';
UPDATE House SET house_points = 970 WHERE house_name = 'Athena';
UPDATE House SET house_points = 35 WHERE house_name = 'Artemis';



`

   pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
        console.error("Error creating tables:", error);
    } else {
        console.log("Tables created successfully:", results);
    }
    process.exit();
});