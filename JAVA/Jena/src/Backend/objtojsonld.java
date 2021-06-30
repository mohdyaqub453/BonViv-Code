package Backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.github.jsonldjava.core.JsonLdOptions;
import com.github.jsonldjava.core.JsonLdProcessor;
import com.github.jsonldjava.utils.JsonUtils;

import ioinformarics.oss.jackson.module.jsonld.JsonldModule;
import ioinformarics.oss.jackson.module.jsonld.JsonldResource;

import java.io.IOException;
import java.util.HashMap;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;


/*
 *This class convert java object to jsonld
 *first we initialize data in person class and convert instance of person to jsonld
 */
public class objtojsonld {
	public String jsonldstring() throws IOException
	{
	ObjectMapper objectMapper = new ObjectMapper();
	objectMapper.configure(SerializationFeature.INDENT_OUTPUT,true);
	objectMapper.registerModule(new JsonldModule());

	// Create Person Instance
	Person person = new Person();
	person.id = "123";
	person.name = "Mohammad yaqub";
	person.jobtitle = "Software Developer";
	person.url = "https://abc.com";
	person.age = 22;

	// Transform to JSON-LD
	String personJsonLd;
	     
	    
		personJsonLd = objectMapper.writer().writeValueAsString(JsonldResource.Builder.create().build(person));
		//System.out.println(personJsonLd);
		return personJsonLd;
	}
	public static void main(String[] args) throws IOException {
		
		objtojsonld obj = new objtojsonld();
		String personJsonLd = obj.jsonldstring();
		System.out.println(personJsonLd);
	
	
}
}




