package com.piggymetrics.hello.controller;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class HelloController {

	@RequestMapping(path = "/message", method = RequestMethod.GET)
	public Object getMessage(Principal principal) {
		return "Hello " + principal.getName();
	}
	
}
