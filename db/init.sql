CREATE TABLE Radars (
    RadarID SERIAL PRIMARY KEY,
    IP VARCHAR(45) NOT NULL,  -- Supports both IPv4 and IPv6
    Latitude DECIMAL(9,6) NOT NULL,
    Longitude DECIMAL(9,6) NOT NULL
);

CREATE TYPE UserType AS ENUM ('Admin', 'Carer', 'Guest');

CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Email VARCHAR(255) UNIQUE NOT NULL,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    PasswordHash TEXT NOT NULL,
    UserType UserType DEFAULT 'Regular' NOT NULL
    -- Add a timezone?
);

CREATE TABLE RadarsUsers (
    RadarID INT REFERENCES Radars(RadarID) ON DELETE CASCADE,
    UserID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    PRIMARY KEY (RadarID, UserID)
);

CREATE TYPE LoginStatus AS ENUM ('Success', 'Failure', 'Blocked');

CREATE TABLE SignIns (
    SignInID SERIAL PRIMARY KEY,
    UserID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    LoginStatus LoginStatus NOT NULL,
    IP VARCHAR(45),
    Device VARCHAR(255)
);

CREATE TYPE FallType AS ENUM ('Slow', 'Fast', 'False');

CREATE TYPE ResponseStatus AS ENUM ('Pending', 'Acknowledged', 'Resolved');

CREATE TABLE Falls (
    FallID SERIAL PRIMARY KEY,
    RadarID INT REFERENCES Radars(RadarID) ON DELETE CASCADE,
    FallType FallType NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ResponseStatus ResponseStatus DEFAULT 'Pending' NOT NULL
);

-- Indexes to improve query performance
CREATE INDEX idx_user_email ON Users(Email);
CREATE INDEX idx_signin_userid ON SignIns(UserID);
CREATE INDEX idx_falls_radarid ON Falls(RadarID);