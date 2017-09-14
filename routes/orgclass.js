var express = require('express');
var router = express.Router();

var sql = require('mssql');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('orgclass', { });
    // sql.connect(global.db_constr).then(function() {
    //     // Query
    //     new sql.Request().query("select * from dm_yx").then(function(recordset) {
    //         //console.dir(recordset);
    //         //result['schools'] = recordset;
    //         res.render('orgclass', { schools:recordset});
    //
    //     }).catch(function(err) {
    //         // ... query error checks
    //         res.render('error', { message: 'query error' });
    //     });
    //
    //     }).catch(function(err) {
    //         // ... connect error checks
    //         res.render('error', { message: 'connect error' });
    // });

});

/* GET users listing. */
router.get('/byschool', function(req, res, next) {

    sql.connect(global.db_constr).then(function() {
        // Query
        //console.log(global.db_constr)
        console.log(req.query.year);
        new sql.Request().query("select  * from dm_bj where nj = '"+req.query.year+"' and zydm in (select zydm from dm_zy where yxdm = '"+req.query.school+"')").then(function(recordset) {
            console.dir(recordset);
            res.render('orgclass', { items: recordset});
        }).catch(function(err) {
            // ... query error checks
            res.render('error', { message: 'query error' });
        });

        }).catch(function(err) {
            // ... connect error checks
            res.render('error', { message: 'connect error' });
    });

});
module.exports = router;
