package com.example.spring.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class DataNotFoundException extends RuntimeException {

  private static final long serialVersionUID = 1556587568709120812L;

  public DataNotFoundException(Throwable e) {
    super(e);
  }
}
