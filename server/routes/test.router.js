const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET
  router.get( '/', (req, res )=>{
    console.log( '/api/test GET hit');
    const queryString = `SELECT test.id AS "id",
test.name AS "name",
test.status AS "status",
test.description AS "description",
test.location AS "location",
test.school AS "school",
TO_CHAR(test.inserted_at, 'MM-DD-YYYY') AS "inserted"
FROM "test";`;
    pool.query(queryString).then(( results )=> {
      console.log( 'results rows from DB', results.rows )
        res.send( results.rows );
    }).catch((err)=> {
        console.log(err);
        res.sendStatus(400);
    })
});
// GET /'search'
router.get( '/search', ( req, res )=>{
  console.log( 'api/search GET' );
  const queryString = `SELECT * FROM "search" ORDER BY "id" ASC;`;
  pool.query( queryString ).then( ( results )=>{
      res.send( results.rows );
  }).catch( ( err )=>{
      console.log( err );
      res.sendStatus( 400 );
  })
})
// POST
router.post('/', (req, res)=> {
  console.log( '/api/test POST:', req.body, req.query );
  const queryString = `INSERT INTO "test" ( "name", "description", "location", "school", "inserted_at") VALUES ($1, $2, $3, $4, NOW() );`;
  const values = [ req.body.name, req.body.description, req.body.location, req.body.school ];
  pool.query(queryString, values ).then( ( results )=>{
      res.sendStatus( 201 );
  }).catch((err)=>{
      console.log(err);
      res.sendStatus( 400 );
  })
})
// POST '/search'
router.post( '/search', ( req, res )=>{
  console.log( '/api/search POST:', req.body, req.query );
  // res.send( 'woof' );
  const queryString = `INSERT INTO "search" ("url") VALUES ( $1 );`;
  const values = [ req.body.url ];
  pool.query( queryString, values ).then( ( results )=>{
      res.sendStatus( 201 );
  }).catch( ( err )=>{
      res.sendStatus( 400 );
  })
})
// PUT


// DELETE
module.exports = router;
