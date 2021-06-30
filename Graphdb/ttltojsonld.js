const ttl2jsonld = require('@frogcat/ttl2jsonld').parse;

/*
*This file convert turtle to jsonld via parser
*
*/

const ttl = `@prefix foaf: <http://xmlns.com/foaf/0.1/> .

<http://manu.sporny.org/about#manu> a foaf:Person;
  foaf:name "Manu Sporny";
  foaf:homepage <http://manu.sporny.org/> .
`;
var json_object = ttl2jsonld(ttl);
console.log(json_object)