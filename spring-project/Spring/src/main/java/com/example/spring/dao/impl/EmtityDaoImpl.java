package com.example.spring.dao.impl;

import java.io.Serializable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.example.spring.dao.AbstractGenericDAO;
import com.example.spring.dao.EntityDao;
import com.example.spring.entities.Customer;

@Repository
@Transactional(rollbackFor = Exception.class)
public class EmtityDaoImpl extends AbstractGenericDAO<Customer> implements EntityDao {

}
