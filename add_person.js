const settings = require("./settings"); // settings.json
const data = process.argv.splice(2);
const firstName = data[0]
const lastName = data[1]
const dateOfBirth = data[2]

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
  .insert({
    first_name: firstName,
    last_name: lastName,
    birthdate: dateOfBirth
   })
  .then(() =>
    knex.destroy()
  )



