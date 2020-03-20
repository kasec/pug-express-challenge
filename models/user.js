const db = require('../dbconnection');
const user = {
    nick: '',
    nombres: '',
    apellidos: '',
    password: '',
    rol: '',
    correo: '',
    update: function (user) {
        const { nick, nombres, apellidos, password, rol, correo } = user;
        const query = 'update users set nick=' + `'${nick}', nombres='${nombres}', apellidos='${apellidos}', password='${password}', rol='${rol}', correo='${correo}' where id=${user.id}` 
        console.log(query)
        return new Promise((resolve, reject) => {
            db.query(query, function (error, results, fields) {
                if (error) reject(error);
                resolve(results)
            });
        })
    },
    findByID: function (userID) {
        const query = 'select * from users where id = ' + userID
        console.log(query)
        return new Promise((resolve, reject) => {
            db.query(query, function (error, results, fields) {
                if (error) reject(error);
                resolve(results)
            });
        })
    },
    save: function (user) {
        const query = 'insert into users(nick, nombres, apellidos, password, rol, correo) VALUES(' + Object.values(user).map(item => item ? Number(item) ? item : `'${item}'` : '\'\'').join(',') + ')'
        console.log(query)
        return new Promise((resolve, reject) => {
            db.query(query, function (error, results, fields) {
                if (error) reject(error);
                resolve(results)
            });
        })
    },
    delete: function(userID) {
        const query = 'DELETE FROM users WHERE id = ' + userID
        console.log(query)
        return new Promise((resolve, reject) => {
            db.query(query, function (error, results, fields) {
                if (error) reject(error);
                resolve(results)
            });
        })
    },
    showAll: function() {
        return new Promise((resolve, reject) => {
            db.query('select * from users', function (error, results, fields) {
                if (error) reject(error);
                resolve(results)
            });
        }) 
    }
}
module.exports = user;