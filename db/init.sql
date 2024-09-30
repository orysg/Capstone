CREATE TABLE IF NOT EXISTS Falls (
    radar_id INT PRIMARY KEY,
    person_id INT NOT NULL,
    fall_timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Falls (radar_id, person_id) VALUES 
(1, 101),
(2, 102),
(3, 103),
(4, 104),
(5, 105);