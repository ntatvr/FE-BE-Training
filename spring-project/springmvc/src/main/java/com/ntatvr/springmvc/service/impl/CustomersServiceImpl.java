package com.ntatvr.springmvc.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ntatvr.springmvc.entity.Customer;
import com.ntatvr.springmvc.repository.CustomersRepository;
import com.ntatvr.springmvc.service.CustomersService;


@Service(value = "customersService")
@Transactional
public class CustomersServiceImpl implements CustomersService {

  @Autowired
  private CustomersRepository customersRepository;

  @Override
  public List<Customer> findAll() {
    return customersRepository.findAll();
  }

  @Override
  public void save(Customer theCustomer) {
    customersRepository.save(theCustomer);
  }

  @Override
  public Customer getOne(Integer theId) {
    return customersRepository.getOne(theId);
  }

  @Override
  public void deleteById(Integer theId) {
    customersRepository.deleteById(theId);
  }

  @Override
  public Optional<Customer> findById(Integer theId) {
    return customersRepository.findById(theId);
  }

  @Override
  public List<Customer> excuteQuery() {
    return customersRepository.excuteQuery();
  }

}
