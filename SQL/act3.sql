CREATE TABLE classrooms (id integer, student_id integer, section CHAR);


INSERT INTO classrooms(id, student_id, section)
VALUES
(1,1,'A'),
(2,2,'A'),
(3,3,'B'),
(4,4,'C'),
(5,5,'B'),
(6,6,'A'),
(7,7,'C'),
(8,8,'B'),
(9,9,'B'),
(10,10,'C');

-- Inner join
SELECT * FROM
students AS a
INNER JOIN classrooms AS b ON a.id = b.id;


-- left join
SELECT * FROM
students AS a
LEFT JOIN classrooms AS b ON a.id = b.id;


-- right join
SELECT * FROM
students AS a
RIGHT JOIN classrooms AS b ON a.id = b.id;


-- full join
SELECT * FROM
students AS a
FULL JOIN classrooms AS b ON a.id = b.id;