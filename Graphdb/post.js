
const {GraphDBServerClient,ServerClient, ServerClientConfig} = require('graphdb').server;
const {SparqlXmlResultParser,SparqlJsonResultParser,JsonLDParser} = require('graphdb').parser
const {GetQueryPayload,UpdateQueryPayload} = require('graphdb').query
const {QueryType} = require('graphdb').query
const fs = require('fs')
const {RDFMimeType,QueryContentType} = require('graphdb').http;
const {RepositoryType,RepositoryClientConfig,RDFRepositoryClient,GetStatementsPayload} = require('graphdb').repository;
const {repository} = require('./client')

/*
*This method work as Post method in crud
*in this post method we add files in graphdb 
*/

//repository.registerParser(new JsonLDParser());
const contentType = RDFMimeType.TURTLE;
const turtleFile = __dirname + '/statements.ttl';    //add input file as jsonld
fs.readFile(turtleFile, (err, stream) => {
    repository.upload(stream, contentType)
    .catch((e) => console.log(e));
});


