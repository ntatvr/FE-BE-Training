package com.example.spring.model;

import java.io.Serializable;
import java.util.HashSet;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * The Class Crawler.
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Crawler implements Serializable {

  /** The Constant serialVersionUID. */
  private static final long serialVersionUID = 2590185890978563588L;

  /** The hash set. */
  @SuppressWarnings("unused")
  private HashSet<String> hashSet;

  /**
   * Instantiates a new crawler.
   *
   * @param hashSet the {@link HashSet}
   */
  public Crawler(HashSet<String> hashSet) {
    super();
    this.hashSet = hashSet;
  }
}
