package com.example.spring.dao;

import java.io.Serializable;
import java.util.Optional;

public interface GenericDAO<T extends Serializable> {

  Optional<T> get(Object id);

  T load(Object id);
}
