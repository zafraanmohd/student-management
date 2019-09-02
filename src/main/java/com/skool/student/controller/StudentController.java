package com.skool.student.controller;

import com.skool.student.model.Student;
import com.skool.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.swing.plaf.synth.SynthEditorPaneUI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*")
@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;
    //students
    @GetMapping(value = "/all")
    public List<Student> getAllStudents(Model model)
    {
        return studentRepository.findAll();
    }

    @GetMapping(value = "/{name}")
    public Student getStudent(@PathVariable String name)
    {
        Student stud = studentRepository.findByName(name);
        if (stud!=null)
        {
            return stud;
        }
        else
            return null;

    }

    //update student
    @CrossOrigin(origins = "http://localhost:8080")
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public Student updateStudent(@RequestBody Student student)
    {
        System.out.println(student.getName());
        try
        {
            studentRepository.save(student);
            System.out.println(studentRepository.findById(student.getId()).get().getName());
        }
        catch (Exception e)
        {
            System.out.println("Error");
            return new Student();
        }

        return studentRepository.findById(student.getId()).get();
    }

    //add student
    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping(value="/add")
    @ResponseStatus(HttpStatus.OK)
    public Student addStudent(@RequestBody Student student)
    {
        System.out.println("Adding"+student.getName());
        try
        {
            studentRepository.save(student);
            System.out.println(studentRepository.findById(student.getId()).get().getName());
        }
        catch (Exception e)
        {
            System.out.println("Error");
            return (new Student());
        }
        return studentRepository.findById(student.getId()).get();
    }
    //remove student
    @CrossOrigin(origins = "http://localhost:8080")
    @DeleteMapping("/delete/{studentName}")
    @ResponseStatus(HttpStatus.OK)
    public Student deleteStudent(@PathVariable String studentName)
    {
        Student student = studentRepository.findByName(studentName);
        if(student!=null)
        {
            studentRepository.delete(student);
            return null;
        }
        else
        {
            return null;
        }
    }
}
