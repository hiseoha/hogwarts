const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
const port = 3001;
const getConn = require('./server');
const bodyParser = require('body-parser');
const { parentPort } = require('worker_threads');
const cookieParser = require('cookie-parser');
const { copyFileSync } = require('fs');
const { Session } = require('inspector');

const cors =  require('cors');
const axios = require('axios');

const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/static'));

app.use(cors({
    origin: true,
    credentials: true,
}))

app.use(cookieParser());
app.use(
    session({
        key: 'loginData',
        secret: 'testSecret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60*60*24,
        },
    })

)


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/login', async (req, res) => {
    res.sendFile(__dirname + "/views/ticket.html");
    res.cookie('userCookie', 'set cookie');

    // if (req.headers.cookie) {
    //     const [, privateKey] = req.headers.cookie.split('=');
    //     const userInfo = session[privateKey];
    //     res.render('/login', {
    //       isLogin: true,
    //       userInfo,
    //     });
    //   } else {
    //     res.render('/login', { isLogin: false });
    //   }

    }); //로그인 연결

app.post('/login', async (req, res) => {
    const u_id = req.body.u_id, u_pw = req.body.u_pw;
    const sql = `SELECT * FROM user where id='${u_id}'`;

    const user = [u_id, u_pw];
    getConn(conn => {
        conn.query(sql, user[0], (err, row, fields) => {
            if(err) console.log(err);

            if(row.length){
                if(user[1] !== row[0].pw){
                    console.log('비밀번호가 일치하지 않음');
                    res.send("<script>alert('비밀번호가 일치하지 않습니다'); history.back();</script>");

                } else {
                    console.log('로그인 성공');
                    const privateKey = Math.floor(Math.random() * 1000000000);
                    session[privateKey] = user;
                    console.log(session);

                    res.setHeader('Set-Cookie', `connect.id=${privateKey}; path=/`);

                    res.send("<script>alert('너 내 동료가 돼라'); location.href = document.referrer;</script>");
                }
            }else {
                console.log('아이디가 존재하지 않습니다');
                res.send("<script>alert('등록되지 않은 학생입니다'); history.back();</script>");
            }
        });
        conn.release();
    })
});

app.get('/join', async (req, res) => {
        res.sendFile(__dirname + "/views/join.html");
    }); //회원가입 연결

app.post('/join', async (req, res) => {
    const data = req.body;

    const sql = `
    INSERT INTO user
        (id, pw, house, u_name)
        VALUES
        ('${data.u_id}', '${data.u_pw}', 'none', '${data.u_name}')
    `;

    getConn(conn => {
        conn.query(sql, (err, rows, fields) => {
            if(!err) {
                console.log(rows);
                // res.redirect('/login');
            }            
        });
        conn.release();
    })

});

// module.exports = router;

app.listen(port, () => {
    console.log(`서버 실행 포트번호 ${port}`);
});