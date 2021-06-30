const newEngine = require('@comunica/actor-init-sparql').newEngine;
const N3 = require('n3');
const N3Store = N3.Store;
const DataFactory = require('n3').DataFactory;

/*
*we query and update in database from this file
*we give query in function like client 
*/
const {main}= require('./database');

//const store = main()
async function fun(){
const search_query=`
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX ab: <http://learningsparql.com/ns/addressbook#> 
PREFIX d:  <http://learningsparql.com/ns/data#> 

SELECT ?Title  ?Genre WHERE {
  ?s  ab:Title ?Title;
      ab:Genre ?Genre
} LIMIT 100`


const update_query = `
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX ab: <http://learningsparql.com/ns/addressbook#> 
PREFIX d:  <http://learningsparql.com/ns/data#> 

INSERT DATA
{ 
  
# People

d:book1 ab:Title "The name of the Wind" ; 
        ab:Genre "Fantasy" ;
		ab:authors d:a1.
        

d:book2 ab:Title "The Wise Man's Fear" ; 
        ab:Genre  "Fantasy" ;
		ab:authors d:a1.
         

d:book3 ab:Title "The Long Earth" ; 
        ab:Genre  "Science fiction" ;
		ab:authors d:a2,d:a4 .

d:book4 ab:Title "Invisible Man" ; 
        ab:Genre  "Fiction" ;
		ab:authors d:a3.
		
d:book5 ab:Title "The Time Machine" ; 
        ab:Genre  "Science Fiction" ;
        ab:authors d:a3.		#book details
		
		
		
d:a1 ab:Author_Name "Patrick Rothfuss";     #Authors details
      ab:Age "44" .

d:a2 ab:Author_Name "Terry Pratchett";
      ab:Age "66" .
	  
d:a3 ab:Author_Name "H. G. Wells";
      ab:Age "79" .
	  
d:a4 ab:Author_Name "Stephen Baxter";
      ab:Age "63" .

#author writtens book

d:a1 ab:Writtens d:book1,d:book2.
d:a2 ab:Writtens d:book3 .
d:a3 ab:Writtens d:book4,d:book5 .
d:a4 ab:Writtens d:book3 .

}
`
main(update_query,search_query)
//await search_function(search_query)
//await search_function(search_query)
}

fun()
