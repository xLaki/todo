const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin2',
    password : 'student',
    database : 'ninjatasker'
});

exports.allTodos = (req, res) => {
    console.log(req.context);
    let sql = 'SELECT * FROM task';
    req.context.db.query(sql, function (err, results) {
        if (err) throw err;
        // rendering tasks view and passing taskToDo data
        console.log(results)
        res.render('tasks', {taskToDo: results});
    });
};

exports.postTodos = (req, res) => {
    let task = req.body
    let sql = 'INSERT INTO task SET ?';
    req.context.db.query(sql, task, function (err, results) {
        if (err) throw err;
        // rendering tasks view and passing taskToDo data
        console.log(results)
        res.redirect('/')
    });
};

exports.killTodos = (req, res) => {
    let sql = 'DELETE  FROM task WHERE ID =' + req.params.id;
    req.context.db.query(sql, function(err, result) {
        if(err) throw err;
        console.log(result);
        res.json(result)
    })
};