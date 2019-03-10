package com.example.spring.service;

public interface EntityService<T> {

  T load(Object id);
}
