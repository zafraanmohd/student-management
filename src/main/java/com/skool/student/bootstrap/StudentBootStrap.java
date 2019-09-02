package com.skool.student.bootstrap;

import com.skool.student.model.Student;
import com.skool.student.repository.StudentRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

//@Component //Removed when using mysql as database and not h2
public class StudentBootStrap implements ApplicationListener<ContextRefreshedEvent> {
    private StudentRepository studentRepository;

    public StudentBootStrap(StudentRepository studentRepository)
    {
        this.studentRepository = studentRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        initData();
    }

    public void initData()
    {
        Student student = new Student(1,"Mark","2nd","B","Miranda","Thomas","569832","miranda@mail.com","21 Jump Street");
        Student student2 = new Student(2,"Lamp","2nd","B","Miranda","Thomas","569832","miranda@mail.com","21 Jump Street");
        Student student3 = new Student(3,"Mista","3rd","B","Miranda","Thomas","569832","miranda@mail.com","21 Jump Street");
        Student student4 = new Student(4,"Jane","2nd","B","Miranda","Thomas","569832","miranda@mail.com","21 Jump Street");
        Student student5 = new Student(5,"Bark","1st","B","Miranda","Thomas","569832","miranda@mail.com","21 Jump Street");
        studentRepository.save(student);
        studentRepository.save(student2);
        studentRepository.save(student3);
        studentRepository.save(student4);
        studentRepository.save(student5);
    }
}
