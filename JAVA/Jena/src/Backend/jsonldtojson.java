package Backend;

import java.io.IOException;
import java.util.HashMap;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.jsonldjava.core.JsonLdOptions;
import com.github.jsonldjava.core.JsonLdProcessor;
import com.github.jsonldjava.utils.JsonUtils;

/*
 * This class convert Jsonld -> Json ->javaobject
 * this class convert jsonld to compact form
 *  after that we convert into javaobejct using PersonJson class
 */
public class jsonldtojson {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		objtojsonld obj = new objtojsonld();
		String personJsonLd = obj.jsonldstring(); //jsonld data from objtojsonld class
		Object jsonObject = JsonUtils.fromString(personJsonLd);
		Object compact = JsonLdProcessor.compact(jsonObject, new HashMap<>(), new JsonLdOptions());

		// Convert JSON to String
		String compactContent =JsonUtils.toPrettyString(compact);
		
		System.out.println(compactContent);
		
		//converting json to object
		ObjectMapper objectMapper = new ObjectMapper();
		personJson person = objectMapper.readValue(compactContent, personJson.class);
		System.out.println(person.getName());  //object of json
	}

}
