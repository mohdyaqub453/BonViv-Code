const {SparqlXmlResultParser,SparqlJsonResultParser,NTriplesParser,JsonLDParser,TurtleParser,TriGParser} = require('graphdb').parser
const {GetQueryPayload,UpdateQueryPayload} = require('graphdb').query
const {QueryType} = require('graphdb').query
//const JsonLdParser = require("jsonld-streaming-parser").JsonLdParser;
//const myParser = new JsonLdParser();
const fs = require('fs')
const {RDFMimeType,QueryContentType} = require('graphdb').http;
const {repository} = require('./client')
//const ttl2jsonld = require('@frogcat/ttl2jsonld').parse;
//console.log(repository)


/*
*This method will create or construct graph with the help of construct query
*and gives output in some specified formatlike quads
*and print the data to console
*
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
repository.registerParser(new JsonLDParser());

/*
const payload = new GetQueryPayload()
      .setQuery(`prefix ab: <http://learningsparql.com/ns/addressbook#>
      prefix d:<http://learningsparql.com/ns/data#>
      construct{?subject  ab:abc ?Title.} where {?subject  ab:Title ?Title}`)
      .setQueryType(QueryType.CONSTRUCT)
      .setContentType(QueryContentType.SPARQL_QUERY)
      .setResponseType(RDFMimeType.JSON_LD)         //output json
      .setLimit(2);
*/
      const payload = new GetQueryPayload()
      .setQuery(`prefix ab: <http://learningsparql.com/ns/addressbook#> construct {?subject  ab:New_Name ?name .} where {?subject  ab:Author_Name ?name}`)
      .setQueryType(QueryType.CONSTRUCT)
      .setContentType(QueryContentType.SPARQL_QUERY)
      .setResponseType(RDFMimeType.JSON_LD)         //output json
      .setLimit(2); // this does not work in construct query

      
     var subject = ""
     var predicate  = ""
     var object  = "" 
    repository.query(payload).then((stream) => {
      stream.on('data', (bindings) => {
          console.log(payload);
        // the bindings stream converted to data objects with the registered parser
        subject += bindings.subject.value +"\n";
        predicate +=bindings.predicate.value +"\n";
        object  +=bindings.object.value +"\n";
        console.log(bindings)
      }); 
      stream.on('end', () => {
        // handle end of the stream
        console.log("subject\n\n"+ subject)
        console.log("predicate\n\n"+ predicate)
        console.log("object\n\n"+ object)
      });
    }).catch(err=>console.log(err));