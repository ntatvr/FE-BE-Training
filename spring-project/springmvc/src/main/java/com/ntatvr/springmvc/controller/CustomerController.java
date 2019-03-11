package com.ntatvr.springmvc.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ntatvr.springmvc.entity.Customer;
import com.ntatvr.springmvc.exception.DataNotFoundException;
import com.ntatvr.springmvc.service.CustomerService;

@Controller
@RequestMapping("/customer")
public class CustomerController {

	@Autowired
	private CustomerService customerService;

	/**
	 * Load customer by id
	 *
	 * @param id
	 *            the id of customer
	 * @return the customer
	 * @throws DataNotFoundException
	 */
	@GetMapping("/load/{id}")
	@ResponseBody
	public ResponseEntity<Customer> loadCustomer(@PathVariable("id") Integer id) throws DataNotFoundException {
		Customer customer = customerService.getCustomer(id);
		return Optional.ofNullable(customer).map(user -> ResponseEntity.ok().body(user)) // 200 OK
				.orElseGet(() -> ResponseEntity.notFound().build()); // 404 Not found
	}

}
