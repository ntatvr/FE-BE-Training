package com.example.spring.service;

import java.util.Optional;
import com.example.spring.entities.Customer;

/**
 * The Interface CustomerService.
 */
public interface CustomerService {

  /**
   * Gets the.
   *
   * @param id the id of customer
   * @return the optional
   */
  Optional<Customer> get(Object id);

  /**
   * Load customer by id
   *
   * @param id the id of customer
   * @return the customer
   */
  Customer load(Object id);
}
