DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS chat;

CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    created timestamp without time zone DEFAULT now(),
    username varchar(255) UNIQUE NOT NULL,
    password_hash varchar(400) NOT NULL
);

CREATE TABLE IF NOT EXISTS admins (
    id serial PRIMARY KEY,
    created timestamp without time zone DEFAULT now(),
    username varchar(255) UNIQUE NOT NULL,
    password_hash varchar(400) NOT NULL
);

CREATE TABLE IF NOT EXISTS teams (
    id serial PRIMARY KEY,
    created timestamp without time zone DEFAULT now(),
    teamname varchar(255) NOT NULL,
    member1 varchar(255) NOT NULL,
    member2 varchar(255) NOT NULL,
    group_number integer NOT NULL,
    points integer default 0
);

CREATE TABLE IF NOT EXISTS matches (
    id serial PRIMARY KEY,
    created timestamp without time zone DEFAULT now(),
    team1_id integer NOT NULL,
    team2_id integer NOT NULL,
    winner_id integer,
    table_number integer NOT NULL,
    start_time varchar(255) NOT NULL,
    FOREIGN KEY(team1_id) REFERENCES teams(id),
    FOREIGN KEY(team2_id) REFERENCES teams(id),
    FOREIGN KEY(winner_id) REFERENCES teams(id)
);

CREATE TABLE IF NOT EXISTS chat (
    id serial PRIMARY KEY,
    created timestamp without time zone DEFAULT now(),
    author varchar(255) NOT NULL,
    textcontent varchar(255) NOT NULL,
    type varchar(255) NOT NULL,
    s3key varchar(255)
);
