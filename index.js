const express = require('express');
const app = express();
var dotenv = require("dotenv");
var db  = require('./dbconnection');
const user = require('./models/user');

//body parser catch form values from client
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//environment variables configuration
dotenv.config();

// db.query('show tables', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//   });
  

const port = process.env.PORT;


app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index', {
      title: 'Homepage',
    });
  });
app.get('/users', (req, res) => {
    user.showAll().then(response => {
        res.render('users', { users:  response});
    }).catch(response => console.log('something wrong ', response))
})
app.get('/user/:id', (req, res) => {
    console.log(req.params);
    user.findByID(req.params.id).then(response => {
        console.log('user id ', response)
        res.render('user', { user:  response});
    })
})

app.post('/api/users', function (req, res) {
    console.log('req ---> ', req.body)
    user.save(req.body).then(response => {
        res.json(response)
    })
});
app.delete('/api/users', function (req, res) {
    console.log('delete user ---> ', req.body)
    user.delete(req.body.id).then(response => {
        res.json(response)
    })
});
app.put('/api/users', function (req, res) {
    console.log('update user ---> ', req.body)
    user.update(req.body).then(response => {
        res.json(response)
    })
});

app.get('/api/users', (req, res) => {
    user.showAll().then(response => {
        res.json({data: response})
    }).catch(response => console.log('something wrong ', response))
})

const server = app.listen(port, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});