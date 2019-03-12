I'm trying to implement a spring mvc project that contains the following technologies:
- JPA: https://docs.oracle.com/javaee/6/tutorial/doc/bnbpz.html
- Hibernate: http://hibernate.org/
- MySQL: https://www.mysql.com/
- Swagger 2: https://swagger.io/
- Lombok: https://projectlombok.org/

#Tomcat: I'm using version 8.5

#IDE: Eclipse Oxygen.3

## Structure
angular-project

├── src // source folder
│   ├── main 
│   │   ├── java
│	│	│	├── com.ntatvr.springmvc
│   │   │   │   ├── config
│   │   │   │   ├── controller
│   │   │   │   ├── entity
│   │   │   │   ├── exception
│   │   │   │   ├── repository
│   │   │   │   ├── service
│   │   │   │   ├── utils
│   │   ├── resource
│	│	│	├── db.sql
│	│	│	├── hibernate.properties
│	│	│	├── jdbc.properties
│   │   ├── webapp
│	│	│	├── WEB-INF // Folter contain jsp files
│	│	│	├── index.jsp // Home page
├── pom.xml
