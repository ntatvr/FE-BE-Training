package com.ntatvr.springmvc.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ntatvr.springmvc.entity.Customer;
import com.ntatvr.springmvc.repository.CustomerRepository;
import com.ntatvr.springmvc.service.CustomerService;


@Service(value = "customerService")
@Transactional
public class CustomerServiceImpl implements CustomerService {

  @Autowired
  private CustomerRepository customerRepository;

  @Override
  public List<Customer> getAll() {
    return customerRepository.findAll();
  }

  @Override
  public void save(Customer theCustomer) {
    customerRepository.save(theCustomer);
  }

  @Override
  public Customer get(Integer theId) {
    return customerRepository.getOne(theId);
  }

  @Override
  public void delete(Integer theId) {
    customerRepository.deleteById(theId);
  }


}
