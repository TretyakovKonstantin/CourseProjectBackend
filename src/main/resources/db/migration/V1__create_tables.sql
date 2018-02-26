CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  token VARCHAR(255),
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  email    VARCHAR(255) UNIQUE,
  bio      TEXT,
  image    VARCHAR(511)
);

INSERT INTO users VALUES ('1', 'Lucy', 'Lucy', 'lucy@mail.ru', 'Lucy');

CREATE TABLE groups (
  id   VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) UNIQUE
);

CREATE TABLE group_to_user (
  group_id VARCHAR(255),
  user_id  VARCHAR(255),
  PRIMARY KEY (group_id, user_id)
);

INSERT INTO groups VALUES ('1', 'Dumbledore''s army');

CREATE TABLE news (
  id      VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255),
  title   VARCHAR(255) NOT NULL,
  body    TEXT
);


CREATE TABLE event (
  id         VARCHAR(255) PRIMARY KEY,
  user_id    VARCHAR(255) NOT NULL,
  title      VARCHAR(255) NOT NULL,
  start_date TIMESTAMP    NOT NULL,
  end_date   TIMESTAMP
);

CREATE TABLE note (
  id      SERIAL PRIMARY KEY,
  title   VARCHAR(255) NOT NULL,
  user_id VARCHAR(255),
  body    TEXT
);

INSERT INTO note VALUES ('1', '1', 'Rifleman''s creed', 'This is my rifle. There are many like it, but this one is mine.
My rifle is my best friend. It is my life. I must master it as I must master my life.
Without me, my rifle is useless. Without my rifle, I am useless. I must fire my rifle true. ' ||
                                                         'I must shoot straighter than my enemy who is trying to kill me. I must shoot him before he shoots me. I will…');

CREATE TABLE article (
  id          VARCHAR(255) PRIMARY KEY,
  user_id     VARCHAR(255),
  slug        VARCHAR(255) UNIQUE,
  title       VARCHAR(255),
  description TEXT,
  body        TEXT,
  created_at  TIMESTAMP NOT NULL,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE article_favorite (
  article_id VARCHAR(255) NOT NULL,
  user_id    VARCHAR(255) NOT NULL,
  PRIMARY KEY (article_id, user_id)
);

CREATE TABLE follow (
  user_id   VARCHAR(255) NOT NULL,
  follow_id VARCHAR(255) NOT NULL
);

CREATE TABLE tag (
  id   VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE article_tag (
  article_id VARCHAR(255) NOT NULL,
  tag_id     VARCHAR(255) NOT NULL
);

CREATE TABLE comment (
  id         VARCHAR(255) PRIMARY KEY,
  body       TEXT,
  article_id VARCHAR(255),
  user_id    VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);