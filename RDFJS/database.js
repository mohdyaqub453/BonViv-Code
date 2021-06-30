const { Quadstore } = require('quadstore');
const { DataFactory } = require('rdf-data-factory');
//const { newEngine } = require('quadstore-comunica');
const levelup = require('levelup')
const leveljs = require('level-js');
const leveldown = require('leveldown')
const newEngine = require('@comunica/actor-init-sparql').newEngine;
const memdown = require('memdown')
const dataFactory = new DataFactory();
const myEngine = newEngine();


/*we created local databse for storing rdf data
*we use memdown database
*we store value in database 
*created two function for update and select query
*/



const main = async (u_query,query) => {
    const startTime = Date.now()
    const EX = `http://ex.io/`
    const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
    const XSD = 'http://www.w3.org/2001/XMLSchema#'
   
    console.log('Ok, if we\'re here the browser has loaded everything correctly');
    
    console.log('We have instantiated the store');
    const store = new Quadstore({
      dataFactory,
      backend: memdown(),
      comunica: newEngine
      
    });
    console.log('After Initialize Store', Date.now() - startTime)
    await store.open();
    console.log('We have opened the store');
    await store.clear();
    console.log('We have cleared the store');
    //console.log(store)
    await store.put(dataFactory.quad(
      dataFactory.namedNode('http://example.com/theanswer'),
      dataFactory.namedNode('http://example.com/is'),
      dataFactory.literal('42'),
    ));
    
    console.log('We have added a quad');
    const update_function  = await myEngine.query(u_query, {
      sources: [store],
    }).then((update_function)=>(update_function.updateResult))
    
    const results = await store.get({});
    console.log('We have queried the store and got the following quads', results.items);
    console.log("sparql result in json format ")
    const result =await myEngine.query(query, {
      sources: [store],
    })
    const { data } = await myEngine.resultToString(result,
      'application/sparql-results+json');
    data.pipe(process.stdout); 
    console.log('After Open & Clear Store', Date.now() - startTime)
    return update_function;
    }
    


module.exports={main}
 