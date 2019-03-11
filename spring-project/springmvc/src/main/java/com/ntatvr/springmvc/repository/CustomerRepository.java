package com.ntatvr.springmvc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.ntatvr.springmvc.entity.Customer;


@Repository("customerRepository")
@Transactional(rollbackFor = Exception.class)
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

}
