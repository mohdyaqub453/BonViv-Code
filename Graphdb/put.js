const fs = require('fs')
const {RDFMimeType,QueryContentType} = require('graphdb').http;
const {RepositoryType,RepositoryClientConfig,RDFRepositoryClient,GetStatementsPayload} = require('graphdb').repository;
const {repository} = require('./client');

/*
*this method works as put method 
*in this method we update the content of database
*
*/
const contentType = RDFMimeType.TURTLE;
const file = __dirname + '/statements-overwrite.ttl';
fs.readFile(file, (err, stream) => {
    repository.overwrite(stream, contentType).catch((e) => console.log(e));
});

