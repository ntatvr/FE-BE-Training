package com.example.spring.dao.impl;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.TypedQuery;
import org.springframework.core.GenericTypeResolver;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.example.spring.dao.EntityDao;
import com.example.spring.exception.DataNotFoundException;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository("entityDao")
@Transactional(rollbackFor = Exception.class)
public class EmtityDaoImpl<T> implements EntityDao<T> {

  @Getter
  @PersistenceContext
  private EntityManager entityManager;

  @Override
  public Optional<T> get(Object id) {
    try {
      String sqlQuery = "SELECT e FROM " + this.getPersistentClass() + " e " + " WHERE e.id = :id";
      TypedQuery<T> query =
          this.getEntityManager().createQuery(sqlQuery, this.getPersistentClass());
      getClass().getSimpleName();
      query.setParameter("id", id);
      return Optional.ofNullable(query.getSingleResult());
    } catch (IllegalArgumentException | PersistenceException e) {
      log.error("No entity was found with id {}, error {} ", id, e);
      return Optional.empty();
    }
  }

  @Override
  public T load(Object id) {
    return this.get(id).orElseThrow(DataNotFoundException::new);
  }

}
