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


# Note
- JSONP
- Transaction
- Junit
- MongoDB

200 OK - Trả về thành công cho các request GET, PUT, PATCH hoặc DELETE. Cũng có thể sử dụng cho POST
201 Created - Trả về cho POST trong trường hợp tạo mới. Nên được kết hợp với Location header để chỉ định tài nguyên mới
204 No Content - Trả về thành công cho một request nhưng ko có body (ví dụ DELETE request)
304 Not Modified - Khi sử dụng HTTP caching headers
400 Bad Request - Yêu cầu không đúng định dạng
401 Unauthorized - Xác thực không hợp lệ.
403 Forbidden - Xác thực thành công nhưng user không có quyền truy cập tài nguyên
404 Not Found - Tài nguyên không tồng tại
405 Method Not Allowed - Khi một method HTTP được request nhưng ko cho phép tới user đã xác thực
410 Gone - Tài nguyên ở endpoint không còn tồn tại.
415 Unsupported Media Type - Content type không hợp lệ
422 Unprocessable Entity - Sử dụng cho các lỗi validation
429 Too Many Requests - Request bị reject do giới hạn rate limiting