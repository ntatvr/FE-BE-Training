package dataaccessobject;

import java.util.ArrayList;
import java.util.List;

public class StudentDaoImpl implements StudentDao{

	private List<Student> list;
	
	
	
	public StudentDaoImpl() {
		super();
		list = new ArrayList<Student>();
		Student st1 = new Student("Nguyen Tuan Anh", 0);
		Student st2 = new Student("Nguyen Tuan Em", 1);
		list.add(st1);
		list.add(st2);
	}

	@Override
	public List<Student> getAllStudents() {
		// TODO Auto-generated method stub
		return list;
	}

	@Override
	public void add(Student student) {
		// TODO Auto-generated method stub
		list.add(student);
	}

	@Override
	public void updateStudent(Student student) {
		// TODO Auto-generated method stub
		list.get(student.getRollNo()).setName(student.getName());
	}

	@Override
	public void deleteStudent(Student student) {
		// TODO Auto-generated method stub
		list.remove(student.getRollNo());
	}

	@Override
	public Student getStudent(int rollNo) {
		// TODO Auto-generated method stub
		return list.get(rollNo);
	}

}
