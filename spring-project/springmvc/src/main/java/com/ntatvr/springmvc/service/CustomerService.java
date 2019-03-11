package com.ntatvr.springmvc.service;

import java.util.List;
import com.ntatvr.springmvc.entity.Customer;
import com.ntatvr.springmvc.exception.DataNotFoundException;

/**
 * The Interface CustomerService.
 */
public interface CustomerService {

  public List<Customer> getCustomers();

  public void saveCustomer(Customer theCustomer);

  public Customer getCustomer(Integer theId) throws DataNotFoundException;

  public void deleteCustomer(Integer theId) throws DataNotFoundException;
}
