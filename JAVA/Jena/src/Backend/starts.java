package Backend;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdfconnection.RDFConnectionFuseki;
import org.apache.jena.rdfconnection.RDFConnectionRemoteBuilder;
import org.apache.jena.vocabulary.*;
import org.apache.jena.rdfconnection.*;
import org.apache.jena.update.UpdateFactory;
import org.apache.jena.update.UpdateRequest;
import java.io.ByteArrayOutputStream;
import org.apache.jena.query.*;
import org.apache.jena.atlas.json.JsonArray;
import org.apache.jena.atlas.json.JsonObject;
import org.apache.jena.atlas.json.JsonValue;
import java.util.List;

/*
 * In the class we created default model for adding data
 * adding data in multiple forms like Turtle,jsonld,rdfjs...etc
 * merge two model 
 * query from model select ,construct, ask..etc 
 * we can also query in the form of json 
 * 
 * in next part of class query from sparql endpoint (JENA FUSEKI)
 * and represent in many form csv,tsv,turtle,json...etc
 * 
 */

public class starts {

	public static void main(String[] args) {
		String URI = "https://abc/animal";
		Model m = ModelFactory.createDefaultModel();
        
		Resource animal1 = m.createResource(URI);
		animal1.addProperty(VCARD.FN,"ELEPHANT");
		//m.write(System.out,"RDF/XML");*/
		//add file in model ttl ,jsonld
		Model model = ModelFactory.createDefaultModel() ;
		model.read("book.ttl") ;
		
		Model model1 = ModelFactory.createDefaultModel();
		model.read("example.jsonld") ;
		model.add(model1);              //merge two model of different company
		
		//model.write(System.out,"JSONLD");          //write model 
		
		String querystring ="\r\n"
				+"prefix ab: <http://learningsparql.com/ns/addressbook#>\r\n"
				+ "prefix d:<http://learningsparql.com/ns/data#>\r\n"
				+ "JSON {'title': ?title ,'genre': ?genre ,'name': ?name}"
				+ "WHERE {\r\n"
				+ "  \r\n"
				+ "		?subject  ab:Title ?title;\r\n"
				+ "                  ab:Genre ?genre;\r\n"
				+ "                  ab:authors ?author.\r\n"
				+ "         ?author ab:Author_Name ?name;\r\n"
				+ "                 ab:Age ?age.\r\n"
				+ "                  \r\n"
				+ "                  \r\n"
				+ "}\r\n"
				+ "LIMIT 5";
		
		//json query for json type output
		Query query = QueryFactory.create(querystring);
		QueryExecution qexec =QueryExecutionFactory.create(query, model);
		//ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		try 
		{
			//result in json output
			JsonArray results = qexec.execJson();
			//results.write(outputStream, "JSONLD");
			System.out.println(results);
		
		
		}
		finally {
			qexec.close();
		}
		
		
		//query from fuseki server
		String service = "http://localhost:3030/first";
		String query1 = "\r\n"
				+"prefix ab: <http://learningsparql.com/ns/addressbook#>\r\n"
				+ "prefix d:<http://learningsparql.com/ns/data#>\r\n"
				+ "SELECT ?subject ?predicate ?object\r\n"
				+ "WHERE {\r\n"
				+ "  ?subject ?predicate ?object\r\n"
				+ "}\r\n"
				+ "LIMIT 5";
		
		//connection for fuseki server
		try (QueryExecution qe = QueryExecutionFactory.sparqlService(service, query1)) {
		    ResultSet rs = qe.execSelect();
		    ResultSetRewindable results = ResultSetFactory.makeRewindable(rs);

		    //output in multiple files
		    System.out.println("---- XML ----");
            ResultSetFormatter.outputAsXML(System.out, results);
            results.reset();

            System.out.println("---- Text ----");
            ResultSetFormatter.out(System.out, results);
            results.reset();

            System.out.println("\n---- CSV ----");
            ResultSetFormatter.outputAsCSV(System.out, results);
            results.reset();

            System.out.println("\n---- TSV ----");
            ResultSetFormatter.outputAsTSV(System.out, results);
            results.reset();
            
            System.out.println("\n---- JSON ----");
            ResultSetFormatter.outputAsJSON(System.out, results);
            results.reset();
		}
		
	}

}
