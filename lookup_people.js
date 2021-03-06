const pg = require("pg");
const settings = require("./settings"); // settings.json
const celebrity = process.argv.slice(2)[0];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT first_name, last_name, birthdate::text FROM famous_people WHERE first_name = $1::text`,[celebrity], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Seaching...");
    console.log(`Found ${result.rows.length} person(s) by the name of '${celebrity}': `);
    result.rows.forEach(function(celeb){
      console.log(`${celeb.first_name} ${celeb.last_name}` + "born " + celeb.birthdate)
    });

    client.end();
  });
});



//$1::text`,[celebrity] for security
//instead of ${'celebrity'}