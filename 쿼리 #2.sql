-- DDL
CREATE TABLE t_board(
	iboard INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
	ctnts VARCHAR(1000) NOT NULL,
	writer VARCHAR(5) NOT NULL,
	created_at DATETIME DEFAULT NOW()	
);

-- DML
-- create
INSERT INTO t_board
(title, ctnts, writer)
VALUES
('ㅎㅇ', 'ㅂㅇ', 'ㅎㅎ');

-- read
SELECT * FROM t_board;
ORDER BY iboard DESC;

SELECT title, ctnts, create_at
FROM t_board
ORDER BY iboard DESC;

-- update
UPDATE t_board
SET title = 'ㅋㅋ'
WHERE iboard = 2;

UPDATE t_board
SET writer = '신사임당'
WHERE iboard = 1;

-- delete
DELETE FROM t_board
WHERE iboard = 2;