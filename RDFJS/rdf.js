const { Store } = require('n3');
const rdf = require('rdf');
const { NamedNode, BlankNode, Literal } = rdf;

/*
*In this file we created triples ,Blancknodes,literal,NmaeNode 
*add triple in graph  & add two graphs
*parse the content of jsonld 
*convert the jsonld into turtle and print on console
*and search tha data in graph
*/




const namednode = new NamedNode('http://example.com/');
console.log(namednode.toTurtle())

const blanknode = new BlankNode();
console.log(blanknode.toString())

const literal = new Literal('plain string');
console.log(literal.toTurtle())

const rdfjs = rdf.factory;

const statement1 = rdfjs.triple(blanknode, namednode, literal);
console.log(statement1.toTurtle())

const rdfenv = rdf.environment;
const x=rdfenv.createLiteral("false", null,rdf.xsdns("boolean")).toTurtle()
console.log(x)

const statement2 = rdfjs.triple(new NamedNode('http://www.w3.org/'), namednode, literal);
console.log(statement2.toTurtle())

const graph = new rdf.Graph();
graph.add(new rdf.Triple(
    new BlankNode(),
    rdf.rdfsns('label'),
    new Literal('Book', '@en'))
    );
graph.add(new rdf.Triple(
    new BlankNode(),
    rdf.rdfns('value'),
    new Literal('10.0', rdf.xsdns('decimal')))
    );
graph.add(new rdf.Triple(
    new BlankNode(),
    rdf.rdfns('value'),
    new Literal('10.1', rdf.xsdns('decimal')))
    );
console.log('graph view of 3 triple')
graph
.match(null,rdf.rdfns('value'),null)
.forEach(
    (triple)=>(console.log(triple.toString()))
    )

    console.log('\n')
    const foaf = rdf.ns('http://xmlns.com/foaf/0.1/');
console.log(rdf.rdfns('label'))

const graph2 = new rdf.Graph();
const bn2 = rdf.factory.blankNode();
 
graph2.add(rdf.factory.triple(
    bn2,
    namednode,
    literal
    ));
graph2.add(rdf.factory.triple(
    bn2,
    rdf.rdfsns('label'),
    rdfjs.literal('Price')
    ));
graph2.add(rdf.factory.triple(
    bn2,
    rdf.rdfns('value'),
    rdfjs.literal('10.0', rdf.xsdns('decimal'))
    ));
 
console.log("isomorphic",graph.isomorphic(graph2))

const person = rdf.ns('http://example.com/');
const partyDocument = rdf.parse({
    "@context": {
        "@vocab": "http://xmlns.com/foaf/0.1/",
        "foaf": "http://xmlns.com/foaf/0.1/",
        "ical": "http://www.w3.org/2002/12/cal/ical#",
        "person": "http://example.com/",
    },
    "@id": person('a'),
    "ical:givenname": rdfjs.literal("Alice"),
    age: 26,
    knows: [
        {
            "@id": person('b'),
            givenname: rdfjs.literal("Bob"),
            age: 36,
            knows: person('a'),
            address: "foaf:BobsAddress",
            
        },
        {
            "@id": person('c'),
            givenname: rdfjs.literal("Carol"),
            age: 46,
            knows: person('a'),
        },
        {
            "@id": person('d'),
            givenname: rdfjs.literal("Dan"),
            age: 56,
            knows: [person('a'), person('b')],
        },

        

        
    ],
    
    "BobsAddress":{ 
        "@id":foaf("BobsAddress"),
        local:rdfjs.literal("1600 Amphitheatre Pkway")}

    
    
})

console.log(partyDocument.n3());

/*const store =rdf.ns("http://example.com/")
const PartyDocument = rdf.parse({
    "@id": "http://store.example.com/",
    
    "name": "Links Bike Shop",
    "description": "The most \"linked\" bike store on earth!",
    "product": [
        {
            "@id": "p:links-swift-chain",
            "@type": "Product",
            "name": "Links Swift Chain",
            "description": "A fine chain with many links.",
            "category": ["cat:parts", "cat:chains"],
            "price": "10.00",
            "stock": 10
        }
    ],
    "@context": {
        "Store": "http://ns.example.com/store#Store",
        "Product": "http://ns.example.com/store#Product",
        "product": "http://ns.example.com/store#product",
        "category":
        {
          "@id": "http://ns.example.com/store#category",
          "@type": "@id"
        },
        "price": "http://ns.example.com/store#price",
        "stock": "http://ns.example.com/store#stock",
        "name": "http://purl.org/dc/terms/title",
        "description": "http://purl.org/dc/terms/description",
        "p": "http://store.example.com/products/",
        "cat": "http://store.example.com/category/"
    }
})

console.log(PartyDocument.n3());*/
const partyGraph = partyDocument.graphify();
partyGraph
    .reference(person('a'))
    .rel(foaf('knows'))
    .rel(foaf("givenname"))
    .toArray()
    .forEach(element => {
        console.log(element.toString())
    });





    console.log("output in turtle format \n")
    const profile = rdf.environment.createProfile();
profile.setDefaultPrefix('http://example.com/');
profile.setPrefix('ff', 'http://xmlns.com/foaf/0.1/');
const turtle = partyGraph
    .toArray()
    .sort(function(a,b){ return a.compare(b); })
    .map(function(stmt){
        return stmt.toTurtle(profile);
    });
//console.log(profile.n3());
console.log(turtle.join('\n'));


store.triple



