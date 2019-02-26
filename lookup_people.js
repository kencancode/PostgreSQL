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
  client.query(`SELECT * FROM famous_people WHERE first_name = $1::text`,[celebrity], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows);
    client.end();
  });
});


//$1::text`,[celebrity] for security
//instead of ${'celebrity'}