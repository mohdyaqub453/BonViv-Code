const {GraphDBServerClient,ServerClient, ServerClientConfig} = require('graphdb').server;
const {RepositoryConfig} = require('graphdb').repository;  
const {RDFMimeType} = require('graphdb').http;
const {RepositoryType} = require('graphdb').repository;
const serverAddress = 'http://localhost:7200';

/*
*This methods helps in creating repository in graphdb via serverclient
*and also manage repository like delete....
*
*/
const serverConfig = new ServerClientConfig(serverAddress)
    .useGdbTokenAuthentication('admin', 'root');
// Instance the server client
const serverClient = new GraphDBServerClient(serverConfig);

 // Create repository configuration
const config = new RepositoryConfig('repo_id', '', new Map(), '',  'Repo title', RepositoryType.FREE);
// Use the configuration to create new repository
serverClient.createRepository(config)
   .then(() => {
     // do work
     console.log(config)
});

//delete repository
serverClient.deleteRepository('repo_id').then(() => {
    // do work  
    console.log("successful")
  });