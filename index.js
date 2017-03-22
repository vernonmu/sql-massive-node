const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const connectionString = "postgres://vernonmu@localhost/jedi";

const app = express();

const port = 3000;

const massiveConnection = massive.connectSync({connectionString : connectionString});

app.set('db', massiveConnection)
const db = app.get('db');

// console.log(db);

app.use(bodyParser.json());
app.use(cors());
app.use(session({secret: 'keyboard smat'}));




app.get('/', function(req,res) {
  db.read_products([], function(err, products) {
    console.log(products)
    console.log(err)
    res.status(200).json(products)
  })
})

app.get('/:product_id', function(req, res, next) {
  db.read_product(req.params.product_id, function(err,found) {

    if (err) {
      console.log(err);
      return next(err)
    }
    console.log(found);
    return res.status(200).json(found)

  })
})

app.put('/', function(req,res,next) {
  db.update_product(req.body.product_id, req.body.description, function(err,updated) {
    if (err) {
      console.log(err)
      return next(err)
    }
    console.log(updated)
    return res.status(200).json(updated)
  })
})

app.post('/', function(req,res,next) {
  db.create_product([req.body.name, req.body.description, req.body.price, req.body.imageurl], function(err, created) {
    if (err) {
      console.log(err);
      return next(err)
    }
    console.log(created);
    return res.status(200).json(created)

  })
})

app.delete('/:product_id', function(req,res,next) {
  db.delete_product(req.params.product_id, function(err,ended) {
    if (err) {
      console.log(err);
      return next(err)
    }
    console.log(ended);
    return res.status(200).json(ended)
  })
})





app.listen(port, function () {
  console.log(`Run to the sun and never ${port}`);
})
