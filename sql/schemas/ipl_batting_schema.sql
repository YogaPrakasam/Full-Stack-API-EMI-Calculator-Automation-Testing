-- SQL Scenario 2: IPL Player Performance Streaks
-- Table structure

CREATE TABLE ipl_batting (
    match_id INTEGER NOT NULL,
    match_date DATE NOT NULL,
    player_id INTEGER NOT NULL,
    player_name VARCHAR(100) NOT NULL,
    runs_scored INTEGER NOT NULL,
    PRIMARY KEY (match_id, player_id)
);