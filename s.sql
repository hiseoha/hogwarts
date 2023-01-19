SELECT A.ifeed, A.location, A.ctnt, A.iuser, A.regdt
		, C.nm AS writer, C.mainimg
		, IFNULL(E.cnt, 0) AS favCnt
		, IF(D.ifeed IS NULL, 0, 1) AS isFav
  FROM t_feed A
 INNER JOIN t_user C 
	 ON A.iuser = C.iuser
  LEFT JOIN
		(
			SELECT ifeed, COUNT(ifeed) AS cnt
	   	FROM t_feed_fav
			GROUP BY ifeed
		) E
		ON A.ifeed = E.ifeed
	LEFT JOIN
		(
			SELECT ifeed, COUNT(ifeed) AS isFav
	   	FROM t_feed_fav
			WHERE iuser = 6
			GROUP BY ifeed
		) D
		ON A.ifeed = D.ifeed
	ORDER BY A.ifeed DESC
	LIMIT 0, 15;
	
	 
	
	
SELECT A.ifeed, A.location, A.ctnt, A.iuser, A.regdt
		, C.nm AS writer, C.mainimg
		, IFNULL(E.cnt, 0) AS favCnt
		, IF(D.ifeed IS NULL, 0, 1) AS isFav
  FROM t_feed A
 INNER JOIN t_user C 
	 ON A.iuser = C.iuser
  LEFT JOIN
		(
		/*좋아요를 한 유저 수에 따라 같은 ifeed 레코드가 늘어나니까 
		count를 세서 
		*/
			SELECT ifeed, COUNT(ifeed) AS cnt
	   	FROM t_feed_fav
			GROUP BY ifeed /*ifeed 값을 기준으로 그룹화*/
		) E
		ON A.ifeed = E.ifeed
	LEFT JOIN
		(
			SELECT ifeed, COUNT(ifeed) AS isFav
	   	FROM t_feed_fav
			WHERE iuser = 6 /*특정 유저가 좋아요한 ifeed*/
			GROUP BY ifeed
		) D
		ON A.ifeed = D.ifeed
	ORDER BY A.ifeed DESC
	LIMIT 0, 15;

DELETE FROM t_feed_fav WHERE ifeed = 16;
ALTER TABLE t_user ADD intro VARCHAR(100) NULL;

SELECT A.*, B.nickname FROM t_review A
                INNER JOIN t_user B
                ON A.iuser = B.iuser
                WHERE A.movie_code = 81888
                ORDER BY A.i_review DESC
                LIMIT 5;
         
         
SELECT A.*, B.uuid FROM t_review A
INNER JOIN t_user B
ON A.iuser = B.iuser
WHERE B.uuid = 'user63';

INSERT INTO t_review
            (iuser, movie_code, ctnt, movie_score)
            VALUE
            (:iuser, :movie_code, :ctnt, :movie_score)uiuxboarduiuxboarduiuxboard