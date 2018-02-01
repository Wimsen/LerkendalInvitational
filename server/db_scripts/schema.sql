DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS chat;

CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  created timestamp without time zone DEFAULT now(),
  mail varchar(255) UNIQUE NOT NULL,
  password_hash varchar(400) NOT NULL,
  name varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS admins (
    id serial PRIMARY KEY,
    created timestamp without time zone DEFAULT now(),
    username varchar(255) UNIQUE NOT NULL,
    password_hash varchar(400) NOT NULL
);

CREATE TABLE IF NOT EXISTS chat (
    id serial PRIMARY KEY,
    created timestamp without time zone DEFAULT now(),
    author varchar(255) NOT NULL,
    message varchar(255) NOT NULL
);
