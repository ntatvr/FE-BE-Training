package com.example.spring.service.impl;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.spring.dao.CustomerDao;
import com.example.spring.entities.Customer;
import com.example.spring.service.CustomerService;

@Service(value = "customerService")
@Transactional
public class CustomerServiceImpl implements CustomerService {

  @Autowired
  private CustomerDao customerDao;

  public Customer load(Object id) {
    return customerDao.load(id);
  }

  @Override
  public Optional<Customer> get(Object id) {
    return customerDao.get(id);
  }
}
