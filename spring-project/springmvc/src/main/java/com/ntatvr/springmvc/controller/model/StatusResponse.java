package com.ntatvr.springmvc.controller.model;

import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * The Class StatusResponse.
 *
 * @param <T> the generic type
 */
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties
public class StatusResponse<T> implements Serializable {

  private static final long serialVersionUID = -7787420605561590283L;

  /** The status. */
  @ApiModelProperty(notes = "Status of response", name = "status", required = false)
  private int status;

  /** The data. */
  @ApiModelProperty(notes = "Data could be error message, entity or a list of entity",
      name = "data", required = false)
  private T data;
}
