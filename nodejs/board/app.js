const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const getConn = require('./mariadb');
const bodyParser = require('body-parser'); //post로 날리는 자료를 받을 수 있게 해줌 이거 아래것도 적어줘야함
const { parentPort } = require('worker_threads');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/static'));//이거 써서 보안 해제함 파일 사용 가능 
//앞: 주소값, 뒤:폴더명

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/api/list', async (req, res) => {
    getConn(conn => {
        const sql = `
        SELECT 
            iboard, title, writer 
        FROM t_board
        ORDER BY iboard DESC
        `;
        conn.query(sql, (err, rows, fields) => {
            if(!err) {
                res.json(rows);
            }            
        });
        conn.release();
    });
});

app.get('/list', async (req, res) => {
    getConn(conn => {
        const sql = `
        SELECT 
            iboard, title, writer 
        FROM t_board
        ORDER BY iboard DESC
        `;
        conn.query(sql, (err, rows, fields) => {
            if(!err) {
                console.log(rows);
                res.render('list', {data : rows});
            }            
        });
        conn.release(); //반납
    });
});

app.get('/write', (req, res) => {
    res.render('write');
})

app.post('/write', async (req, res) => {    
    const data = req.body;
    const sql = `
        INSERT INTO t_board
        (title, ctnts, writer)
        VALUES
        ('${data.title}', '${data.ctnts}', '${data.writer}')
    `;
    console.log(sql);
    
    getConn(conn => {
        conn.query(sql, (err, rows, fields) => {
            if(!err) {
                console.log(rows);
                res.redirect('/list');
            }            
        });
        conn.release();
    });
})

app.get('/detail', (req, res) =>{
    const sql = `
    SELECT * FROM t_board
    WHERE iboard = ${req.query.iboard};
    `;

    getConn(conn => {
        conn.query(sql, (err, rows, fields) => {
            if(!err) {
                const data = rows[0];
                res.render('detail', {data});
            }            
        });
        conn.release();
    });
});

app.get('/delete', (req, res)=>{
    const sql = `
    DELETE FROM t_board
    WHERE iboard = ${req.query.iboard};
    `;

    getConn(conn => {
        conn.query(sql, (err, result, fields) => {
            if(!err) {
                console.log(result);
                res.redirect('/list');
            }            
        });
        conn.release();
    });
})

app.get('/update', (req, res)=>{
    const sql = `
    SELECT * FROM t_board
    WHERE iboard = ${req.query.iboard};
    `;

    getConn(conn => {
        conn.query(sql, (err, rows, fields) => {
            if(!err) {
                const data = rows[0];
                res.render('update', {data});
            }            
        });
        conn.release();
    });
})

app.post('/update', async (req, res) => {    
    const data = req.body;
    const sql = `
    UPDATE t_board
    SET title = '${data.title}', ctnts = '${data.ctnts}', writer = '${data.writer}'
    WHERE iboard = ${data.iboard};
    `;
    
    getConn(conn => {
        conn.query(sql, (err, rows, fields) => {
            if(!err) {
                console.log(rows);
                res.redirect(`/detail?iboard=${data.iboard}`);
            }            
        });
        conn.release();
    });
})

app.listen(port, () => {
    console.log(`서버 실행 포트번호 ${port}`);
});