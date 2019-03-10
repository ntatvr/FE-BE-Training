package com.example.spring.dao.generic;

import java.lang.reflect.ParameterizedType;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.TypedQuery;
import com.example.spring.entities.IEntity;
import com.example.spring.exception.DataNotFoundException;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AbstractGenericDAO<T extends IEntity> implements GenericDAO<T> {

	private Class<T> persistentClass;

	@SuppressWarnings("unchecked")
	public AbstractGenericDAO() {
		this.persistentClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass())
				.getActualTypeArguments()[0];
	}

	@Getter
	@PersistenceContext
	private EntityManager entityManager;

	private String getPersistentName() {
		return this.persistentClass.getSimpleName().toLowerCase();
	}

	@Override
	public Optional<T> get(Object id) {
		try {
			String sqlQuery = "SELECT e FROM " + getPersistentName() + " e " + " WHERE e.id = :id";
			TypedQuery<T> query = this.getEntityManager().createQuery(sqlQuery, this.persistentClass);
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
