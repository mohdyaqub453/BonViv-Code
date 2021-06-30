const {SparqlXmlResultParser,SparqlJsonResultParser,NTriplesParser,JsonLDParser,TurtleParser,TriGParser} = require('graphdb').parser
const {GetQueryPayload,UpdateQueryPayload} = require('graphdb').query
const {QueryType} = require('graphdb').query
const JsonLdParser = require("jsonld-streaming-parser").JsonLdParser;
const myParser = new JsonLdParser();
const fs = require('fs')
const {RDFMimeType,QueryContentType} = require('graphdb').http;
const {repository} = require('./client')
//const ttl2jsonld = require('@frogcat/ttl2jsonld').parse;
//console.log(repository)

/*
*This method works as GET operation
*in this method we perform select opeartion via sparql query
*and print the stream of data in console
*data available only in some specified format like resultJson..etc
*/



const queryy = `prefix ab: <http://learningsparql.com/ns/addressbook#>
prefix d:<http://learningsparql.com/ns/data#>
SELECT ?Title ?Genre ?Author_Name ?Author_age
WHERE {
  
    ?subject  ab:Title ?Title;
                  ab:Genre ?Genre;
                  ab:authors ?author.
         ?author ab:Author_Name ?Author_Name;
                 ab:Age ?Author_age.
                  
                  

          
}
`

//sparql json parsor for converting output in json
//repository.registerParser(new SparqlXmlResultParser());

repository.registerParser(new SparqlJsonResultParser());
const payload = new GetQueryPayload()
      .setQuery(`PREFIX ab: <http://learningsparql.com/ns/addressbook#> select * where {?s ab:Author_Name ?name}LIMIT 2`)
      .setQueryType(QueryType.SELECT)
      .setContentType(QueryContentType.SPARQL_QUERY)
      .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)         //output json
      .setLimit(2);

     // repository.query(payload);
     // payload.log;
     // console.log(payload);
     var data1 = '';
   repository.query(payload).then((stream) => {
      stream.on('data', (bindings) => {
        // the bindings stream converted to data objects with the registered parser
        console.log(bindings)
        //data1+=bindings;

      });
      stream.on('variables', (variables) => console.log(variables));
      stream.on('error', (error) => console.log(error));
      stream.on('end', () => {
        // handle end of the stream
       // console.log(data1);
      });
      
    });

    

    