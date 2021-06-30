package Backend;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.vocabulary.*;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.jena.query.*;
import org.apache.jena.sparql.core.DatasetImpl;
import org.apache.jena.sparql.engine.http.QueryEngineHTTP;
import org.apache.jena.tdb.TDBFactory;

/*
 * in this class we create triple store database  and 
 * do some operation like reading ,writing in database 
 * we can also query in the database
 */
public class dataset {

	public static void main(String[] args) {
		
		//path of database
		 String directory = "MyDatabases/dataset" ;   
		  Dataset dataset = TDBFactory.createDataset(directory) ;
		
		  dataset.begin(ReadWrite.READ) ;
		  // Get model inside the transaction
		  Model model = dataset.getDefaultModel() ;
		  
		  model.write(System.out);
		  
		  dataset.end() ;
		  
		  dataset.begin(ReadWrite.WRITE) ;
		  model = dataset.getDefaultModel() ;
		  model.commit(); 
		  dataset.end() ;	
		

	}

}
