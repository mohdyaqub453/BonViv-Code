const {SparqlXmlResultParser,SparqlJsonResultParser} = require('graphdb').parser
const {GetQueryPayload,UpdateQueryPayload} = require('graphdb').query
const {QueryType} = require('graphdb').query
const fs = require('fs')
const {RDFMimeType,QueryContentType} = require('graphdb').http;
const {repository} = require('./client')


/*
*This file works as update database via sparql query
*we can add insert delete value from database using sparql engine
*/

const payload = new UpdateQueryPayload()
.setQuery(`
INSERT DATA
{ 
  
  "@context": "https://json-ld.org/contexts/person.jsonld",
  "@id": "http://dbpedia.org/resource/John_Lennon1",
  "name": "John Lennon1",
  "born": "1950-10-01",
  "spouse": "http://dbpedia.org/resource/Cynthia_Lennon1"
}`)
.setContentType(QueryContentType.X_WWW_FORM_URLENCODED)
.setInference(true)
.setTimeout(5);

repository.update(payload).then(() => {
  // repository should have been updated at this point
  console.log("Successful")
});
