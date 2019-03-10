package com.example.spring.dao.impl;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.example.spring.dao.CustomerDao;
import com.example.spring.dao.generic.AbstractGenericDAO;
import com.example.spring.entities.Customer;

@Repository(value = "customerDao")
@Transactional(rollbackFor = Exception.class)
public class CustomerDaoImpl extends AbstractGenericDAO<Customer> implements CustomerDao {

}
