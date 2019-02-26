const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});


knex('famous_people')
  .where({first_name: 'Paul'})
  .then(rows => {
    rows.forEach(function(celeb){
      console.log(`${celeb.first_name} ${celeb.last_name}` + "born " + celeb.birthdate)
    });
  });




//can use as a callback... asCallback((result,err,__) =>)


//or as a PROMISE
//.then((results) => {})
//.then(...)
//.then(...)
//.catch(...)
//.finally(...)