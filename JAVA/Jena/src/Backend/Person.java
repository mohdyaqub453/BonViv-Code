package Backend;

import ioinformarics.oss.jackson.module.jsonld.annotation.JsonldId;
import ioinformarics.oss.jackson.module.jsonld.annotation.JsonldProperty;
import ioinformarics.oss.jackson.module.jsonld.annotation.JsonldType;

//Type of jsonld data
/*
 * this class is used for initialized data 
 * and convert data into javaobject
 * and here we add some jsonld property for conversion of object to jsonld
 */
@JsonldType("http://schema.org/Person")
public class Person{
    @JsonldId  
    public  String id;           
    @JsonldProperty("http://schema.org/name")                   //add property to variables
    public String name;
    @JsonldProperty("http://schema.org/jobTitle")
    public String jobtitle;
    @JsonldProperty("http://schema.org/url")
    public String url;
    @JsonldProperty("http://schema.org/age")
    public int age;                             
    
	public String getId() {                   //getter and setter
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getJobtitle() {
		return jobtitle;
	}
	public void setJobtitle(String jobtitle) {
		this.jobtitle = jobtitle;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
    
    
}