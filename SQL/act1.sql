CREATE TABLE students (id integer, first_name VARCHAR, middle_name VARCHAR, last_name VARCHAR, age integer, location VARCHAR);

INSERT INTO students (id, first_name, middle_name, last_name, age, location) VALUES (1, "Juan","Blank", "Cruz", 18, "Manila");
INSERT INTO students (id, first_name, middle_name, last_name, age, location) VALUES (2, "John","Blank", "Young", 18, "Manila");
INSERT INTO students (id, first_name, middle_name, last_name, age, location) VALUES (3, "Victor","Blank", "Rivera", 18, "Manila");
INSERT INTO students (id, first_name, middle_name, last_name, age, location) VALUES (4, "Adrian","Blank", "Co", 18, "Laguna");
INSERT INTO students (id, first_name, middle_name, last_name, age, location) VALUES (5, "Pau","Blank", "Riosa", 18, "Marikina");
INSERT INTO students (id, first_name, middle_name, last_name, age, location) VALUES (6, "Piolo","Blank", "Pascual", 18, "Manila");

UPDATE students 
SET first_name = "Ana", middle_name = "Cui", last_name = "Cajocson", age = 25, location = "Bulacan"
WHERE id = 1;

DELETE FROM students where id = 6
