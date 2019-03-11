package com.ntatvr.springmvc.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ntatvr.springmvc.entity.Customer;
import com.ntatvr.springmvc.exception.DataNotFoundException;
import com.ntatvr.springmvc.service.CustomerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * [@Api] – We can add this Annotation to the controller to add basic information regarding the
 * controller.
 * [@ApiOperation] and [@ApiResponses] – We can add these annotations to any rest method in the
 * controller to add basic information related to that method. e.g.
 * 
 * @author AnhNT
 *
 */
@Api(value = "CustomerController", description = "REST APIs related to Customer Entity!!!!",
    tags = "customer-controller")
@Controller
@RequestMapping("/customer")
public class CustomerController {

  @Autowired
  private CustomerService customerService;

  /**
   * Load customer by id
   *
   * @param id the id of customer
   * @return the customer
   * @throws DataNotFoundException
   */
  @GetMapping("/load/{id}")
  @ResponseBody
  public Customer loadCustomerById(@PathVariable("id") Integer id) throws DataNotFoundException {
    return customerService.getCustomer(id);
  }

  /**
   * Load all customers.
   *
   * @return the list of customers
   * @throws DataNotFoundException the data not found exception
   */
  @ApiOperation(value = "Get list of Customers in the System ", response = Customer.class,
      responseContainer = "List", tags = "customer-controller")
  @ApiResponses(value = {
      @ApiResponse(code = 200, message = "Success|OK"),
      @ApiResponse(code = 401, message = "Not authorized!"),
      @ApiResponse(code = 403, message = "Forbidden!!!"),
      @ApiResponse(code = 404, message = "Not found!!!")})
  @GetMapping("/load/all")
  @ResponseBody
  public List<Customer> loadCustomers() throws DataNotFoundException {
    return customerService.getCustomers();
  }
}
