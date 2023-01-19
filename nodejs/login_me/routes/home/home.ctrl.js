'use strict';

const { rawListeners } = require("../../app");

const UserStorage = require('../../models/userStorage');

const output = {
    home: (req, res)=>{
        res.render('home/index');
    },
    login: (req, res)=>{
        res.render('home/login');
    },
};


const process = {
    login: (req, res) =>{
        const id= req.body.id, 
        pw = req.body.pw;

        console.log(UserStorage.getUsers('id', 'pw', 'name'));
        const response = {};
        // if(UserStorage.users.id.includes(id)) {
        //     const idx = UserStorage.users.id.indexOf(id);
        //     if(users.pw[idx] === pw){
        //         response.success = true;
        //         return res.json(response);
        //     }
        // }
        response.success = false;
        response.msg = '로그인 실패';

        return res.json(response);
    }
};

module.exports = {
    output,
    process,
};