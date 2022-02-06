/**
 * This is the main server script that provides the API endpoints
 * The script uses the database helper in /src
 * The endpoints retrieve, update, and return data to the page handlebars files
 *
 * The API returns the front-end UI handlebars pages, or
 * Raw json if the client requests it with a query parameter ?raw=json
 */

// Utilities we need
const fs = require("fs");
const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false
});

// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/" // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }
});

// Load and parse site data
const site = require("./src/site.json");
if (site.url === "glitch-default") {
  site.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

 

// We use a module for handling database operations in /src
const data = require("./src/data.json");
const db = require("./src/" + data.database);

/**
 * Home route for the app
 *
 * Return the poll options from the database helper script
 * The home route may be called on remix in which case the db needs setup
 *
 * Client can request raw data using a query parameter
 */
fastify.get("/", async (request, reply) => {

});

/**
 * Post route to process user vote
 *
 * Retrieve vote from body data
 * Send vote to database helper
 * Return updated list of votes
 */
fastify.post("/", async (request, reply) => { 

});
    


fastify.get("/test", async (request, reply) => { 
  /* 
  Params is the data we pass to the client
  - SITE values for front-end UI but not for raw data
  */
  let params = request.query.raw ? {} : { site: site };

  // Get the available choices from the database
  const options = await db.getOptions();
  if (options) {
    params.optionNames = options.map(choice => choice.language);
    params.optionCounts = options.map(choice => choice.picks);
  }
  // Let the user know if there was a db error
  else params.error = data.errorMessage;

  // Check in case the data is empty or not setup yet
  if (options && params.optionNames.length < 1)
    params.setup = data.setupMessage;

  // ADD PARAMS FROM TODO HERE

  // Send the page options or raw JSON data if the client requested it
  request.query.raw
    ? reply.send(params)
    : reply.view("/src/pages/index.hbs", params);
});


/**
 * Admin endpoint returns log of votes
 *
 * Send raw json or the admin handlebars page
 */
fastify.get("/q", async (request, reply) => {
  
  
  
    const sql3 = require('better-sqlite3');
    const   db = new sql3( 'memory.db' );
    const  csv = require('csv-parser');
    const   fs = require('fs'); 
  
 
   try {
     
      /*
      // create table
      db.exec( 'DROP TABLE IF EXISTS articles'  ); 
      db.exec( 'CREATE TABLE  articles (  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,  key TEXT,  title TEXT,  year TEXT,  month TEXT,  day TEXT,  journal TEXT,  issn TEXT,  volume TEXT,  issue TEXT,  pages TEXT,  authors TEXT,  url TEXT,  language TEXT,  publisher TEXT,  location TEXT,  abstract TEXT,  notes TEXT,  pubmed_id TEXT,  pmc_id TEXT )' );
      //db.exec( 'DROP TABLE menuItems;' );

      const insrow = db.prepare( 'insert into articles (title,year,month,day,journal,issn,volume,issue,pages,authors,url,language,publisher,location,abstract,notes,pubmed_id,pmc_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )' );

      let s = 1;
      fs.createReadStream('public/articles.csv')
        .pipe(csv({"separator":","}))
        .on('data', (row) => {
          console.log(s++);
          insrow.run( row.title,row.year,row.month,row.day,row.journal,row.issn,row.volume,row.issue,row.pages,row.authors,row.url,row.language,row.publisher,row.location,row.abstract,row.notes,row.pubmed_id,row.pmc_id );
        })
        .on('end', () => {
          console.log('CSV file successfully processed');
          db.close();
        });
       */ 
     const count = db.prepare("SELECT count(id) FROM articles").all();
     reply.view("/src/pages/test.html", {"count":count});
        
    } catch (dbError) {
      console.error(dbError);
    }
});

fastify.get("/qCount", async (request, reply) => {

  
    const sql3 = require('better-sqlite3');
    const   db = new sql3( 'memory.db' );
    const  csv = require('csv-parser');
    const   fs = require('fs'); 
 
   try {
     const count = db.prepare("SELECT count(id) FROM articles").all();
     reply.send({"count":count});
        
    } catch (dbError) {
      console.error(dbError);
    }
});

/*
fastify.post("/qList", async (request, reply) => {
    const sql3 = require('better-sqlite3');
    const   db = new sql3( 'memory.db' );
    const  csv = require('csv-parser');
    const   fs = require('fs'); 
  let params = request.query;
  console.log(params);
  try {
 
     const ss = db.prepare("SELECT id,title,authors,abstract FROM articles WHERE title IN(SELECT title FROM articles WHERE title LIKE '%trust%' AND title LIKE '%happiness%') OR abstract IN(SELECT abstract FROM articles WHERE abstract LIKE '%trust%' AND title LIKE '%happiness%' )").all();
      reply.send(ss); 
 
        
    } catch (dbError) {
      console.error(dbError);
    }

});

*/



fastify.post("/qList", function(req, res) {
  try {
     console.log(req.body);
    return res.send({"list":123});
  } catch (e) {
    return res.send({ msg: e.message });
  }
});


fastify.get("/logs", async (request, reply) => {
  let params = request.query.raw ? {} : { site: site };

  // Get the log history from the db
  params.optionHistory = await db.getLogs();

  // Let the user know if there's an error
  params.error = params.optionHistory ? null : data.errorMessage;

  // Send the log list
  request.query.raw
    ? reply.send(params)
    : reply.view("/src/pages/admin.hbs", params);
});
/**
 * Admin endpoint to empty all logs
 *
 * Requires authorization (see setup instructions in README)
 * If auth fails, return a 401 and the log list
 * If auth is successful, empty the history
 */
fastify.post("/reset", async (request, reply) => {
  let params = request.query.raw ? {} : { site: site };

  /* 
  Authenticate the user request by checking against the env key variable
  - make sure we have a key in the env and body, and that they match
  */
  if (
    !request.body.key ||
    request.body.key.length < 1 ||
    !process.env.ADMIN_KEY ||
    request.body.key !== process.env.ADMIN_KEY
  ) {
    console.error("Auth fail");

    // Auth failed, return the log data plus a failed flag
    params.failed = "You entered invalid credentials!";

    // Get the log list
    params.optionHistory = await db.getLogs();
  } else {
    // We have a valid key and can clear the log
    params.optionHistory = await db.clearHistory();

    // Check for errors - method would return false value
    params.error = params.optionHistory ? null : data.errorMessage;
  }

  // Send a 401 if auth failed, 200 otherwise
  const status = params.failed ? 401 : 200;
  // Send an unauthorized status code if the user credentials failed
  request.query.raw
    ? reply.status(status).send(params)
    : reply.status(status).view("/src/pages/admin.hbs", params);
});

// Run the server and report out to the logs
fastify.listen(process.env.PORT, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});
