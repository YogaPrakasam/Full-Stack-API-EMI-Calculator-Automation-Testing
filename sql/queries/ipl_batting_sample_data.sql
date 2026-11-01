-- Sample IPL 2024 batting records

INSERT INTO ipl_batting
(match_id, match_date, player_id, player_name, runs_scored)
VALUES

-- Virat Kohli: 3 consecutive matches scoring 30+
(1, '2024-03-22', 101, 'Virat Kohli', 50),
(2, '2024-03-25', 101, 'Virat Kohli', 45),
(3, '2024-03-29', 101, 'Virat Kohli', 75),
(4, '2024-04-02', 101, 'Virat Kohli', 20),

-- Ruturaj Gaikwad: 4 consecutive matches scoring 30+
(1, '2024-03-22', 102, 'Ruturaj Gaikwad', 40),
(2, '2024-03-25', 102, 'Ruturaj Gaikwad', 55),
(3, '2024-03-29', 102, 'Ruturaj Gaikwad', 35),
(4, '2024-04-02', 102, 'Ruturaj Gaikwad', 60),

-- Rohit Sharma: streak broken by a low score
(1, '2024-03-22', 103, 'Rohit Sharma', 45),
(2, '2024-03-25', 103, 'Rohit Sharma', 20),
(3, '2024-03-29', 103, 'Rohit Sharma', 55),
(4, '2024-04-02', 103, 'Rohit Sharma', 65);