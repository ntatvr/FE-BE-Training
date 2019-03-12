package com.ntatvr.springmvc.controller;

import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ntatvr.springmvc.controller.model.StatusResponse;
import com.ntatvr.springmvc.entity.Customer;
import com.ntatvr.springmvc.service.CustomerService;
import com.ntatvr.springmvc.utils.Constants;
import com.ntatvr.springmvc.utils.Status;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.NonNull;

/**
 * [@Api] – We can add this Annotation to the controller to add basic information regarding the
 * controller.
 * [@ApiOperation] and [@ApiResponses] – We can add these annotations to any rest method in the
 * controller to add basic information related to that method. e.g.
 * 
 * @author AnhNT
 *
 */
@Api(value = "CustomerController", description = "REST APIs related to Customer Entity!",
    tags = "customer-controller")
@Controller
@RequestMapping("/customer")
public class CustomerController {

  @Autowired
  private CustomerService customerService;

  /**
   * Get customer by id.
   *
   * @param id the id of customer
   * @return the customer
   */
  @ApiOperation(value = "Get Customer by id in the System", response = StatusResponse.class,
      tags = "customer-controller")
  @GetMapping("/get/{id}")
  @ResponseBody
  public StatusResponse<Object> getCustomer(@NonNull @PathVariable("id") Integer id) {

    StatusResponse<Object> response = new StatusResponse<>();

    try {
      Customer customer = customerService.get(id);
      response.setStatus(Status.SUCCESS.getStatus());
      response.setData(customer);
    } catch (Exception e) {
      e.printStackTrace();
      response.setStatus(Status.INTERNAL_SERVER_ERROR.getStatus());
      if (StringUtils.contains(e.getMessage(), "EntityNotFoundException")) {
        response.setStatus(Status.NOT_FOUND.getStatus());
      }
      response.setData(e.getMessage());
    }
    return response;
  }

  /**
   * Delete customer by id.
   *
   * @param id the id of customer
   * @return the customer
   */
  @ApiOperation(value = "Delete Customer by id in the System", response = StatusResponse.class,
      tags = "customer-controller")
  @GetMapping("/delete/{id}")
  @ResponseBody
  public StatusResponse<Object> deleteCustomer(@NonNull @PathVariable("id") Integer id) {

    StatusResponse<Object> response = new StatusResponse<>();

    try {
      customerService.delete(id);
      response.setStatus(Status.SUCCESS.getStatus());
      response.setData(String.format(Constants.MESSAGE_DELETE_SUCCESSFUL, id));
    } catch (Exception e) {
      e.printStackTrace();
      response.setStatus(Status.INTERNAL_SERVER_ERROR.getStatus());
      response.setData(e.getMessage());
    }

    return response;
  }

  /**
   * Load all customers.
   *
   * @return the list of customers
   */
  @ApiOperation(value = "Get list of Customers in the System", response = Customer.class,
      responseContainer = "List", tags = "customer-controller")
  @ApiResponses(value = {
      @ApiResponse(code = 200, message = "Success|OK"),
      @ApiResponse(code = 401, message = "Not authorized!"),
      @ApiResponse(code = 403, message = "Forbidden!!!"),
      @ApiResponse(code = 404, message = "Not found!!!")})
  @GetMapping("/load/all")
  @ResponseBody
  public StatusResponse<Object> loadCustomers() {

    StatusResponse<Object> response = new StatusResponse<>();

    try {
      List<Customer> list = customerService.getAll();
      response.setStatus(Status.SUCCESS.getStatus());
      response.setData(list);
    } catch (Exception e) {
      e.printStackTrace();
      response.setStatus(Status.INTERNAL_SERVER_ERROR.getStatus());
      response.setData(e.getMessage());
    }

    return response;
  }
}
