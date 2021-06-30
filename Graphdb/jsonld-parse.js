const JsonLdParser = require("jsonld-streaming-parser").JsonLdParser;
const fs = require('fs');
const myParser = new JsonLdParser();


/*
*This method parse the data from jsonld to trples (quad)
*/
fs.createReadStream('check.jsonld')
  .pipe(myParser)
  .on('data',console.log)
  .on('error', console.error)
  .on('end', () => console.log('All triples were parsed!'));