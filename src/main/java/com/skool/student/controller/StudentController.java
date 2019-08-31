package com.skool.student.controller;

import com.skool.student.model.Student;
import com.skool.student.repository.StudentRepository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private StudentRepository studentRepository;

    //students
    @GetMapping(value = "/all")
    public List <Student> getAllStudents(Model model)
    {
        return (List<Student>) studentRepository.findAll();

    }
    //add student
    //remove student
    //update student

}
