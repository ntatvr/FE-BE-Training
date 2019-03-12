package com.ntatvr.springmvc.utils;

import lombok.Getter;

/**
 * The Enum Status.
 */
@Getter
public enum Status {

  SUCCESS(200),
  BAD_REQUEST(400),
  NOT_FOUND(404),
  INTERNAL_SERVER_ERROR(500);
  /** The status. */
  private int status;

  /**
   * Instantiates a new status.
   *
   * @param status the status
   */
  private Status(int status) {
    this.status = status;
  }
}
