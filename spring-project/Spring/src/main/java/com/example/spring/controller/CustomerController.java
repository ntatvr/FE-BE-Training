package com.example.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.example.spring.entities.Customer;
import com.example.spring.service.EntityService;

@Controller
@RequestMapping("/customer")
public class CustomerController {

  @Autowired
  private EntityService<Customer> entityService;

  @GetMapping("/load/{id}")
  @ResponseBody
  public Customer loadCustomer(@PathVariable("id") Integer id) {
    return entityService.load(id);
  }

}
