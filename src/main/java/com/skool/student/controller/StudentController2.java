package com.skool.student.controller;

import com.skool.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping(value = "/")
public class StudentController2 {
    @Autowired
    StudentRepository studentRepository;

    @RequestMapping("")
    public String index1(Model model)
    {
        return "index1";
    }
}
