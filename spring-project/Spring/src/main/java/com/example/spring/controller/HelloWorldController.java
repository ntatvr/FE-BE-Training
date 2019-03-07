package com.example.spring.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * The Class HelloWorldController.
 * 
 * Used to define a controller.
 */
@Controller
public class HelloWorldController {

	private static final Logger LOGGER = Logger.getLogger(HelloWorldController.class);

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

		LOGGER.debug("Call API /hello");
		ModelAndView modelAndView = new ModelAndView("helloworld");
		modelAndView.addObject("message", message);
		modelAndView.addObject("name", name);
		return modelAndView;
	}
}
