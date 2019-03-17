package com.ntatvr.springmvc.service;

import java.util.List;
import java.util.Optional;
import com.ntatvr.springmvc.entity.Customer;

public interface GenericService<T> {

  public List<T> findAll();

  public void save(T theObject);

  public T getOne(Integer theId);

  public Optional<Customer> findById(Integer theId);

  public void deleteById(Integer theId);
}
