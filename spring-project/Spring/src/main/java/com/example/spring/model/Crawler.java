package com.example.spring.model;

import java.io.Serializable;
import java.util.HashSet;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * The Class Crawler.
 */
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Crawler implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 2590185890978563588L;

	/** The hash set. */
	private HashSet<String> hashSet;

	/**
	 * @param hashSet
	 */
	public Crawler() {
		super();
	}

	/**
	 * Instantiates a new crawler.
	 *
	 * @param hashSet the {@link HashSet}
	 */
	public Crawler(HashSet<String> hashSet) {
		super();
		this.hashSet = hashSet;
	}

	/**
	 * Gets the hash set.
	 *
	 * @return the hash set
	 */
	public HashSet<String> getHashSet() {
		return hashSet;
	}

	/**
	 * Sets the hash set.
	 *
	 * @param hashSet
	 *            the new hash set
	 */
	public void setHashSet(HashSet<String> hashSet) {
		this.hashSet = hashSet;
	}

}
