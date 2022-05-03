package com.instagram.song.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
@Controller
public class PageController {
	@RequestMapping(value ="/auth/signin", method = RequestMethod.GET)
	public String getSignin() {
		return "auth/signin";
	}
	@RequestMapping(value ="/auth/signup", method = RequestMethod.GET)
	public String getSignup(){
		return "auth/signup";
	}
}
