package com.example.spring.dao;

import java.util.Optional;
import org.springframework.core.GenericTypeResolver;

public interface EntityDao<T> {

  @SuppressWarnings("unchecked")
  default Class<T> getPersistentClass() {
    // ParameterizedType genericSuperclass = (ParameterizedType) getClass().getGenericSuperclass();
    return (Class<T>) GenericTypeResolver.resolveTypeArgument(getClass(), EntityDao.class);
  }

  Optional<T> get(Object id);

  T load(Object id);
}
