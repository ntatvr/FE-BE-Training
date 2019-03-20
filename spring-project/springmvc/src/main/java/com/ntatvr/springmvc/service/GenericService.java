package com.ntatvr.springmvc.service;

import java.util.List;
import java.util.Optional;

public interface GenericService<T> {

  public List<T> findAll();

  public List<T> findAll(Integer limit, Integer page);

  public void save(T theObject);

  public T getOne(Integer theId);

  public Optional<T> findById(Integer theId);

  public void deleteById(Integer theId);
  
  public void deleteAll();
}
