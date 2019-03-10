package com.example.spring.dao.generic;

import java.util.Optional;
import com.example.spring.entities.IEntity;

/**
 * The Interface GenericDAO.
 *
 * @param <T> the generic type
 */
public interface GenericDAO<T extends IEntity> {

  /**
   * Gets the.
   *
   * @param id the id
   * @return the optional
   */
  Optional<T> get(Object id);

  /**
   * Load entity by id
   *
   * @param id the id
   * @return the entity
   */
  T load(Object id);
}
