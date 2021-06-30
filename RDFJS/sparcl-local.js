const newEngine = require('@comunica/actor-init-sparql').newEngine;
const N3 = require('n3');
const N3Store = N3.Store;
const fs = require('fs');
const DataFactory = require('n3').DataFactory;
const store = new N3Store();
const myEngine = newEngine();
  
/*
*there is Two method  result_update and select method  
*in result_update we update the store via sparql query
*and elect method gives otput in the form of json ,xml..etc
*/


const query = `
PREFIX dc: <http://purl.org/dc/elements/1.1/>
INSERT DATA
{ 
  <http://example/book1> dc:title "A new book" ;
                         dc:creator "A.N.Other" .
}
`
const result_update = myEngine.query(query, {
    sources: [store],
  }).then((data)=>(data.updateResult));



const query1 = `
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
INSERT DATA
{ 
  <http://example/president25> foaf:givenName "Bill" .
  <http://example/president25> foaf:familyName "McKinley" .
  <http://example/president27> foaf:givenName "Bill" .
  <http://example/president27> foaf:familyName "Taft" .
  <http://example/president42> foaf:givenName "Bill" .
  <http://example/president42> foaf:familyName "Clinton" .
}
  `

  //function for updation
  const update_function =function update_function(u_query){ myEngine.query(u_query, {
    sources: [store],
  }).then((update_function)=>(update_function.updateResult))
};


//function for search query
async function search_function(query)
{
  const result =await myEngine.query(query, {
  sources: [store],
})
const { data } = await myEngine.resultToString(result,
  'application/sparql-results+json');
data.pipe(process.stdout); 

}

  


/*myEngine.query(`
  PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
  
  INSERT { ?person foaf:givenName 'William' }
  WHERE
  {
    ?person foaf:givenName 'Bill' 
  }`,{
    sources: [ store ],
  }).then((data)=>{data.updateResult});


  const result =  myEngine.query(`
  SELECT * WHERE {
    ?s ?p ?o
  } LIMIT 100`, {
  sources: [store],
});

myEngine.resultToString(result,
  'application/json').then((result)=>{
    result.bindingsStream.on('data', (quad) => {
        console.log(quad);
       
    });
  })
  


/*
  myEngine.query(`
  SELECT * {
    ?s ?p ?o
  } LIMIT 100
  `, {
  sources: [store],
  }).then(function (result) {
  result.bindingsStream.on('data', function (data) {
    // Each variable binding is an RDFJS term
    console.log(data.get('?s').value + ' ' + data.get('?p').value + ' ' + data.get('?o').value);
  });
  });


  
const parser = new N3.Parser();
parser.parse(
  `PREFIX c: <http://example.org/cartoons#>
   c:Tom a c:Cat.
   c:Jerry a c:Mouse;
           c:smarterThan c:Tom.`,
  (error, quad, prefixes) => {
    if (quad)
      console.log(quad);
    else
      console.log("# That's all, folks!", prefixes);
  });

 
      rdfStream = fs.createReadStream(`PREFIX c: <http://example.org/cartoons#>
      c:Tom a c:Cat.
      c:Jerry a c:Mouse;
              c:smarterThan c:Tom.`));
parser.parse(rdfStream, console.log);*/

// P




module.exports = {update_function,search_function}

