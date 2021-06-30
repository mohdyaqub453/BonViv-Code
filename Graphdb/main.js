const {GraphDBServerClient,ServerClient, ServerClientConfig} = require('graphdb').server;
const {SparqlXmlResultParser,SparqlJsonResultParser} = require('graphdb').parser
const {GetQueryPayload,UpdateQueryPayload} = require('graphdb').query
const {QueryType} = require('graphdb').query
const fs = require('fs')
const {RDFMimeType,QueryContentType} = require('graphdb').http;
const {RepositoryType,RepositoryClientConfig,RDFRepositoryClient,GetStatementsPayload} = require('graphdb').repository;
const endpoint = 'http://localhost:7200';

/*
*This file is server client 
*we configure this with the help of gdbToken
*and login as admin
*
*/

const headers = {'Accept': 'text/plain'};
 const config = new ServerClientConfig(endpoint)
    .setTimeout(5000)
    .setHeaders(headers)
    .useGdbTokenAuthentication('admin', 'root');
 
const client = new ServerClient(config);
 console.log(client)