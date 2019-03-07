package dataaccessobject;

import java.util.List;

public interface StudentDao {
	public List<Student> getAllStudents();
	
	public void add(Student student);
	
	public void updateStudent(Student student);
	
	public void deleteStudent(Student student);
	
	public Student getStudent(int rollNo);
	
	
}
