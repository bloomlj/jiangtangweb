var express = require('express');
var router = express.Router();

var sql = require('mssql');


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(global.db_constr);
    sql.connect(global.db_constr).then(function() {
        // Query

        new sql.Request().query("select top 10 u.*,b.bjmc as classname from Accounts_Users as u left join dm_bj as b  on u.DepartmentID = b.bjdm where UserType = 's' ").then(function(recordset) {
            //console.dir(recordset);
            res.render('student', { students: recordset });
        }).catch(function(err) {
            // ... query error checks
            res.render('error', { message: 'query error' });
        });

        }).catch(function(err) {
            // ... connect error checks
            res.render('error', { message: 'connect error' });
    });

});

/* GET users listing. */
router.get('/byteam/:id', function(req, res, next) {

    sql.connect(global.db_constr).then(function() {
        // Query

        new sql.Request().query("select u.*,b.bjmc as classname from Accounts_Users as u left join dm_bj as b  on u.DepartmentID = b.bjdm where UserType = 's' and u.EmployeeID in (select xh from xkmd where gCode = '"+req.params.id+"')").then(function(recordset) {
            //console.dir(req);
            console.log(req.params.id);
            res.render('student', { students: recordset });
        }).catch(function(err) {
            // ... query error checks
            res.render('error', { message: 'query error' });
        });

        }).catch(function(err) {
            // ... connect error checks
            res.render('error', { message: 'connect error byteam' });
    });

});

module.exports = router;
