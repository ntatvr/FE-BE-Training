package com.ntatvr.springmvc.service;

import java.util.List;

public interface GenericService<T> {

  public List<T> getAll();

  public void save(T theCustomer);

  public T get(Integer theId);

  public void delete(Integer theId);
}
