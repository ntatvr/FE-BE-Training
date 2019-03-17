package com.ntatvr.springmvc.controller;

import java.io.Serializable;
import java.util.List;
import javax.persistence.EntityNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ntatvr.springmvc.exception.ApiData;
import com.ntatvr.springmvc.exception.ApiMessage;
import com.ntatvr.springmvc.exception.EntryNotFoundException;
import com.ntatvr.springmvc.utils.Constants;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.Getter;
import lombok.NonNull;

@Getter
public abstract class RESTController<T, ID extends Serializable> {

  private JpaRepository<T, ID> repository;

  /**
   * Instantiates a new REST controller.
   *
   * @param repository the repository
   */
  public RESTController(JpaRepository<T, ID> repository) {
    this.repository = repository;
  }

  /**
   * Load all Entities.
   *
   * @return the list of Entities
   */
  @ApiOperation(value = "Get list of Entity in the System", response = ApiData.class)
  @ApiResponses(value = {@ApiResponse(code = 200, message = "Success|OK"),
      @ApiResponse(code = 401, message = "Not authorized!"),
      @ApiResponse(code = 403, message = "Forbidden!!!"),
      @ApiResponse(code = 404, message = "Not found!!!")})
  @GetMapping
  @ResponseBody
  public ResponseEntity<Object> findAll() {

    List<T> list = this.getRepository().findAll();
    return new ResponseEntity<>(new ApiData(list.size(), list), HttpStatus.OK);
  }

  /**
   * Get Entity by ID.
   *
   * @param id the ID of Entity
   * @return the Entity
   */
  @ApiOperation(value = "Get Entity in the System by ID", response = ApiData.class)
  @GetMapping("/{id}")
  @ResponseBody
  public ResponseEntity<Object> findById(@NonNull @PathVariable ID id) {

    T t = this.getRepository().findById(id).orElseThrow(
        () -> new EntityNotFoundException(String.format(Constants.ERROR_DOES_NOT_EXIST, id)));
    return new ResponseEntity<>(new ApiData(t), HttpStatus.OK);
  }

  /**
   * Delete Entity by ID.
   *
   * @param id the ID of Entity
   * @return the Entity
   * @throws EntryNotFoundException
   */
  @ApiOperation(value = "Delete Entity in the System by ID", response = ApiData.class)
  @DeleteMapping("/{id}")
  @ResponseBody
  public ResponseEntity<Object> deleteById(@NonNull @PathVariable ID id)
      throws EntryNotFoundException {

    this.getRepository().findById(id).orElseThrow(
        () -> new EntityNotFoundException(String.format(Constants.ERROR_DOES_NOT_EXIST, id)));
    this.getRepository().deleteById(id);
    return new ResponseEntity<>(new ApiMessage(Constants.MESSAGE_DELETE_SUCCESSFUL), HttpStatus.OK);
  }
}
