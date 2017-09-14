var express = require('express');
var router = express.Router();

const pool = require('../lib/db');

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+file.originalname.split('.').pop())
  }
})
var upload = multer({ storage: storage })


/* GET users listing. */
router.get('/', function(req, res, next) {

  //to run a query we just pass it to the pool
  //after we're done nothing has to be taken care of
  //we don't have to return any client to the pool or close a connection
  pool.query('SELECT * FROM things', [],function(err, dbres) {
    if(err) {
      console.error('error running query', err);
      res.render('error', {message: 'query error'});
    }
    //res.json({number:dbres.rows[0], message:'success'});
    res.render('things/list', { makers: dbres.rows});
    console.log('id:', dbres.rows[0].id);
  });
});


/* GET users listing. */
router.get('/create', function(req, res, next) {
    res.render('things/create', {});
});



/* Post makers to  create maker. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    var content = {};
    var category = {};
    pool.query('insert into things(maker_id,title,cover,abstract,content,category,copyright,created_at,updated_at) values ($1,$2,$3,$4,$5,$6,$7,now(),now()) ', [req.body['maker_id'],req.body['title'],req.body['cover'],req.body['abstract'],content,category,req.body['copyright']],function(err, dbres) {
      if(err) {
        console.error('error running query', err);
        res.render('error', {message: 'query error'});
      }
      res.redirect('/makers');
      //console.log('id:', dbres.rows[0].id);
    });

});


/* GET users info update form. */
router.get('/:id/update', function(req, res, next) {
  pool.query('SELECT * FROM things where id = $1', [req.params['id']],function(err, dbres) {
    if(err) {
      console.error('error running query', err);
      res.render('error', {message: 'query error'});
    }
    //res.json({number:dbres.rows[0], message:'success'});
    console.dir(dbres.rows[0]);
    res.render('things/update', { 'thing':dbres.rows[0]});

    console.log('id:', dbres.rows[0].id);
  });
});


/* GET users listing. ???*/
router.post('/:id/update', function(req, res, next) {
  pool.query('update things set name=$2,about=$3, updated_at= now() where id = $1', [req.params['id'],req.body['name'],req.body['about']],function(err, dbres) {
    if(err) {
      console.error('error running query', err);
      res.render('error', {message: 'query error'});
    }
    res.redirect('/makers');
  });
});


/* GET users listing. */
router.get('/:id/delete', function(req, res, next) {
  pool.query('delete from things where id = $1', [req.params['id']],function(err, dbres) {
    if(err) {
      console.error('error running query', err);
      res.render('error', {message: 'query error'});
    }
    res.redirect('/things');
  });
});

/* GET users listing. */
router.get('/t', function(req, res, next) {
    res.send("ttt");
});



module.exports = router;
