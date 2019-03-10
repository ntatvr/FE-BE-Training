package com.example.spring.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.spring.dao.EntityDao;
import com.example.spring.service.EntityService;

@Service
@Transactional
public class EntityServiceImpl<T> implements EntityService<T> {

  @Autowired
  private EntityDao<T> entityDao;

  public T load(Object id) {
    return entityDao.load(id);
  }
}
