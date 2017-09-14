var express = require('express');
var router = express.Router();

var sql = require('mssql');


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(global.db_constr);
    sql.connect(global.db_constr).then(function() {
        // Query

        new sql.Request().query("select top 10 * from xscj").then(function(recordset) {
            //console.dir(recordset);
            res.render('assessment', { items: recordset });
        }).catch(function(err) {
            // ... query error checks
            res.render('error', { message: 'query error' });
        });

        }).catch(function(err) {
            // ... connect error checks
            res.render('error', { message: 'connect error' });
    });

});


/* GET assessment_add form for project score: report score,make score */
router.get('/project_add/:student_id', function(req, res, next) {
  //res.render('assessment_add',{student_id:req.params.student_id});

    sql.connect(global.db_constr).then(function() {
        // Query

              new sql.Request().query("select xh,gCode,xkmd.gzdm,tm,dm_sxgz.gzmc from xkmd left join dm_sxgz on xkmd.gzdm = dm_sxgz.gzdm where xh='"+req.params.student_id+"'").then(function(recordset) {
                  console.dir(recordset);
                  res.render('assessment/project_add', { items: recordset,student_id:req.params.student_id });
              }).catch(function(err) {
                  // ... query error checks
                  res.render('error', { message: 'query error' });
              });
        }).catch(function(err) {
            // ... connect error checks
            res.render('error', { message: 'connect error' });
    });

});

/* GET assessment_add form for exam score. */
router.get('/exam_add/:student_id', function(req, res, next) {
  res.render('assessment/exam_add',{student_id:req.params.student_id});
});


/* post add a student's make  and report assessment */
router.post('/project/:student_id', function(req, res, next) {

  var sqlstr ="insert into xscjdev (xh,gCode,gzdm,cj,report_cj) values ";
  for (var i = 0; i < req.body.make_score.length; i++) {
     sqlstr += "('"+req.params.student_id+"','"+ req.body.team_code[i] +"','"+ req.body.project_code[i]  +"','"+req.body.make_score[i]+"','"+req.body.report_score[i]+"'),";
  }
  sqlstr = sqlstr.slice(0,-1)+';';
  console.log(sqlstr);
    sql.connect(global.db_constr).then(function() {
        // Query

        var request = new sql.Request();
        request.query(sqlstr).then(function(recordset) {
            console.log(request.rowsAffected);
            res.redirect('/assessment/bystudent/'+req.params.student_id);
            //res.render('error', { message: request.rowsAffected+" Rows insert." });
        }).catch(function(err) {
            // ... query error checks
            res.render('error', { message: 'query error' });
        });

        }).catch(function(err) {
            // ... connect error checks
            res.render('error', { message: 'connect error' });
    });

});

/* post add a student's make  and report assessment */
router.post('/exam/:student_id', function(req, res, next) {

  var sqlstr ="insert into exam_score (student_id,exam_score) values ('"+req.params.student_id+"','"+req.body.exam_score+"');";
  console.log(sqlstr);
    sql.connect(global.db_constr).then(function() {
        // Query
        var request = new sql.Request();
        request.query(sqlstr).then(function(recordset) {
            console.log(request.rowsAffected);
            res.redirect('/assessment/bystudent/'+req.params.student_id);
            //res.render('error', { message: request.rowsAffected+" Rows insert." });
        }).catch(function(err) {
            // ... query error checks
            res.render('error', { message: 'query error' });
        });

        }).catch(function(err) {
            // ... connect error checks
            res.render('error', { message: 'connect error' });
    });
});




/* GET assessment project score edit form ,need send query string like ?team_code = xxx */
router.get('/project_edit/:student_id', function(req, res, next) {
  //res.render('assessment_add',{student_id:req.params.student_id});

});

/* put update a student's  assessment */
router.put('/project/:student_id', function(req, res, next) {

});

/* GET student assessment listing. */
router.get('/byclass/:id', function(req, res, next) {

    sql.connect(global.db_constr).then(function() {
        // Query

        new sql.Request().query("select xh,xm,AVG(cj) as make_cj_avg,AVG(report_cj) as report_cj_avg,exam_score from xscj left join exam_score on xh = exam_score.student_id where xh in (select EmployeeID from Accounts_Users where DepartmentID = '"+req.params.id+"') group by xh,xm,exam_score").then(function(recordset) {
            console.dir(recordset);

            console.log(req.params.id);
            res.render('assessment_byclass', { items: recordset });
        }).catch(function(err) {
            // ... query error checks
            res.render('error', { message: 'query error' });
        });

        }).catch(function(err) {
            // ... connect error checks
            res.render('error', { message: 'connect error byteam' });
    });

});


/* GET a student's assessment listing. */
router.get('/bystudent/:id', function(req, res, next) {

    sql.connect(global.db_constr).then(function() {
        // Query
        new sql.Request().query("select * from xscj where xh  = '"+req.params.id+"'").then(function(recordset) {
            //console.dir(recordset);

            console.log(req.params.id);
            res.render('assessment', { items: recordset,student_id : req.params.id});
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
