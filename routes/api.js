var express = require('express');
var router = express.Router();

const pool = require('../lib/db');


/* GET schools. */
router.get('/makers', function(req, res, next) {

  //to run a query we just pass it to the pool
  //after we're done nothing has to be taken care of
  //we don't have to return any client to the pool or close a connection
  pool.query('SELECT * FROM makers', [],function(err, dbres) {
    if(err) {
      return console.error('error running query', err);
    }
    res.json({number:dbres.rows[0], message:'success'});
    console.log('id:', dbres.rows[0].id);
  });


});

//
// /* GET student assessment listing. */
// router.get('/assessment/:studentid', function(req, res, next) {
//
//   sql.connect(global.db_constr).then(function() {
//       // Query
//
//       new sql.Request().query("select xh,xm,AVG(cj) as make_cj_avg,AVG(report_cj) as report_cj_avg,exam_score from xscj left join exam_score on xh = exam_score.student_id where xh ='"+req.params.studentid+"' group by xh,xm,exam_score").then(function(recordset) {
//
//           res.json({ assessment:recordset[0],message:'success'});
//       }).catch(function(err) {
//           // ... query error checks
//           res.json({ message: 'query error' });
//       });
//
//       }).catch(function(err) {
//           // ... connect error checks
//           res.json({ message: 'connect error byteam' });
//   });
//
// });


module.exports = router;
