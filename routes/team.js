var express = require('express');
var router = express.Router();

var sql = require('mssql');


/* GET users listing. */
router.get('/', function(req, res, next) {

    sql.connect(global.db_constr).then(function() {
        // Query

        new sql.Request().query("select top 10 tm,team.gzdm as project_id,gCode as team_id,project.gzmc as project_name from exp_roomtime as team left join exp_info as project on team.gzdm = project.gzdm").then(function(recordset) {
            console.dir(recordset);
            res.render('team', { teams: recordset });
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
