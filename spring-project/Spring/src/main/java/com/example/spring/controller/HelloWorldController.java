package com.example.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;

/**
 * The Class HelloWorldController.
 * 
 * Used to define a controller.
 */
@Slf4j
@Controller
public class HelloWorldController {

	String message = "Welcome to Spring MVC!";

	/**
	 * Show message.
	 *
	 * @param name the parameter
	 * @return the model and view
	 */
	@RequestMapping("/hello")
	public ModelAndView showMessage(
			@RequestParam(value = "name", required = false, defaultValue = "World") String name) {

		log.debug("Call API /hello");
		ModelAndView modelAndView = new ModelAndView("helloworld");
		modelAndView.addObject("message", message);
		modelAndView.addObject("name", name);
		return modelAndView;
	}
}
