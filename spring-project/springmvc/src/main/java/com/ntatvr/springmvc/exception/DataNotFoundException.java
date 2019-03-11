package com.ntatvr.springmvc.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class DataNotFoundException extends Exception {

  private static final long serialVersionUID = 1556587568709120812L;

  public DataNotFoundException(Throwable e) {
    super(e);
  }

  public DataNotFoundException(Object resourId) {
    super(resourId != null ? resourId.toString() : null);
  }
}
