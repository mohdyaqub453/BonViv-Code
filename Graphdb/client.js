const {GraphDBServerClient,ServerClient, ServerClientConfig} = require('graphdb').server;
const {SparqlXmlResultParser,SparqlJsonResultParser} = require('graphdb').parser
const {GetQueryPayload,UpdateQueryPayload} = require('graphdb').query
const {QueryType} = require('graphdb').query
const fs = require('fs')
const {RDFMimeType,QueryContentType} = require('graphdb').http;
const {RepositoryType,RepositoryClientConfig,RDFRepositoryClient,GetStatementsPayload} = require('graphdb').repository;


const endpoint = 'http://localhost:7200/';
const endpoints = ['http://localhost:7200/repositories/first'];
const headers = {};
const contentType = '';
const readTimeout = 3000;
const writeTimeout = 3000;

/*
*This is RepositoryClient we must Configure with the username and password for authentication
*and create repository instance
*
*/


const config = new RepositoryClientConfig(endpoint)
  .setEndpoints(endpoints)
  .setHeaders({
    'Accept': RDFMimeType.JSON_LD
  })
  .setDefaultRDFMimeType(QueryContentType.SPARQL_QUERY)
  .setReadTimeout(readTimeout)
  .setWriteTimeout(writeTimeout)
  .useGdbTokenAuthentication('testUser', 'password');
const repository = new RDFRepositoryClient(config);

const httpRequest = repository.httpClients[0].request;

module.exports = {repository}
//console.log(repository)