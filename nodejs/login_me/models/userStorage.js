'use strict';

class UserStorage {
    static #users = {
    id: ['wldnjs', 'wjddnjs', 'gPfls', 'tjgk'],
    pw: ['1212', 'aaaa', 'qkqh', 'ajdcjddl'],
    name: ['황지원', '유정원', '김혜린'],
    };

static getUsers() {
    return this.#users;
    }
}

module.exports = UserStorage;