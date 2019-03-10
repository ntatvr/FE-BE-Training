package com.example.spring.service;

import java.io.Serializable;
import com.example.spring.entities.Customer;

public interface EntityService {

  Customer load(Object id);
}
