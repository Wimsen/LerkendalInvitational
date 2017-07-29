CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  mail varchar(255) UNIQUE NOT NULL,
  password_hash varchar(400) NOT NULL,
  name varchar(50) NOT NULL,
  deleted integer default 0,
  created timestamp without time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS standusers (
  id serial PRIMARY KEY,
  mail varchar(255) UNIQUE  NOT NULL,
  name varchar(50) NOT NULL,
  deleted integer default 0,
  created timestamp without time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bugs (
    id serial PRIMARY KEY,
    user_id integer NOT NULL,
    title varchar(255) NOT NULL,
    description varchar(1000) NOT NULL,
    category CHARACTER(1) NOT NULL,
    route varchar(100) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    created timestamp without time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admins (
    id serial PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    password_hash varchar(400) NOT NULL
)
