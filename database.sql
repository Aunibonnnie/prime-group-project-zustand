CREATE TABLE "users" (
 "id" SERIAL PRIMARY KEY,
 "username" VARCHAR (80) UNIQUE NOT NULL,
 "password" VARCHAR (1000) NOT NULL,
 "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
 "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "test" (
 "id" SERIAL PRIMARY KEY,
 "user_id" INTEGER,
 "inserted_at" DATE default null,
 "name" VARCHAR(50),
 "zip" INTEGER,
 "location" INT,
 "status" BOOLEAN
);
INSERT INTO "test" ("user_id", "name", "zip", "location", "status", "inserted_at")
VALUES
('1','Ru',54321, 1, true, NOW() ),
('2','Anthony',54322, 2, true, NOW() ),
('3','Aunika',54323, 3, true, NOW() ),
('4','Aden',54324, 1, true, NOW() ),
('5','Brad',54325, 2, true, NOW() ),
('6','Abdi',54326, 1, true, NOW() ),
('7','Gregg',54330, 1, true, NOW() );
SELECT * FROM "test";

SELECT test.id AS "id",
test.name AS "name",
test.status AS "status",
test.zip AS "zip",
test.location AS "location",
TO_CHAR(test.inserted_at, 'MM-DD-YYYY') AS "inserted"
FROM "test";

DROP TABLE "test";