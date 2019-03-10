package com.example.spring.service.impl;

import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.spring.dao.EntityDao;
import com.example.spring.entities.Customer;
import com.example.spring.entities.IEntity;
import com.example.spring.service.EntityService;

@Service
@Transactional
public class EntityServiceImpl implements EntityService {

  @Autowired
  private EntityDao entityDao;

  public Customer load(Object id) {
    return entityDao.load(id);
  }
}
