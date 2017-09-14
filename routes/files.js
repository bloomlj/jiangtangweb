var express = require('express');
var router = express.Router();

const pool = require('../lib/db');


var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.'+file.originalname.split('.').pop())
  }
})
var upload = multer({ storage: storage })


/* GET users listing. */
router.get('/', function(req, res, next) {
  //to run a query we just pass it to the pool
  //after we're done nothing has to be taken care of
  //we don't have to return any client to the pool or close a connection
  pool.query('SELECT * FROM files', [],function(err, dbres) {
    if(err) {
      console.error('error running query', err);
      res.render('error', {message: 'query error'});
    }
    //res.json({number:dbres.rows[0], message:'success'});
    res.render('files/list', { files: dbres.rows});
    console.log('id:', dbres.rows.length);
  });
});


/* GET users listing. */
router.get('/create', function(req, res, next) {
    res.render('files/create', {});
});


router.post('/', upload.single('share-file'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.dir(req.file);
  console.dir(req.body);
  pool.query('insert into files (maker_id,org_name,category,mimetype,filename,note,created_at) values ($1,$2,$3,$4,$5,$6,now()) ', [req.user.id,req.file.originalname,req.body['category'],req.file.mimetype,req.file.filename,req.body['note']],function(err, dbres) {
    if(err) {
      console.error('error running query', err);
      res.render('error', {message: 'query error'});
    }
    res.redirect('/files');
    //console.log('id:', dbres.rows[0].id);
  });

})


/* Post makers to  create maker. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    pool.query('insert into makers(login,password,name,about,created_at) values ($1,$2,$3,$4,now()) ', [req.body['login'],req.body['password'],req.body['name'],req.body['about']],function(err, dbres) {
      if(err) {
        console.error('error running query', err);
        res.render('error', {message: 'query error'});
      }
      res.redirect('/files');
      //console.log('id:', dbres.rows[0].id);
    });

});

/* GET file info update form. */
router.get('/:id/update', function(req, res, next) {
  pool.query('SELECT * FROM files where id = $1', [req.params['id']],function(err, dbres) {
    if(err) {
      console.error('error running query', err);
      res.render('error', {message: 'query error'});
    }
    //res.json({number:dbres.rows[0], message:'success'});
    console.dir(dbres.rows[0]);
    res.render('files/update', { 'file':dbres.rows[0]});

    console.log('id:', dbres.rows[0].id);
  });
});


/* GET users listing. */
router.post('/:id/update', function(req, res, next) {
  pool.query('update files set category=$2, note=$3 , updated_at= now() where id = $1', [req.params['id'],req.body['category'],req.body['note']],function(err, dbres) {
    if(err) {
      console.error('error running query', err);
      res.render('error', {message: 'query error'});
    }
    res.redirect('/files');
  });
});


/* GET users listing. */
router.get('/:id/delete', function(req, res, next) {
  pool.query('delete from files where id = $1', [req.params['id']],function(err, dbres) {
    if(err) {
      console.error('error running query', err);
      res.render('error', {message: 'query error'});
    }
    res.redirect('/files');
  });
});

/* GET users listing. */
router.get('/t', function(req, res, next) {
    res.send("ttt");
});




module.exports = router;
