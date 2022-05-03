package com.instagram.song.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.instagram.song.service.AuthService;
import com.instagram.song.web.dto.auth.SignupRequestDto;

@Controller
public class AuthController {
	@Autowired
	private AuthService authService;
	
	@ResponseBody
	@RequestMapping(value = "/auth/signup", method =RequestMethod.POST, produces = "text/html;charset=utf-8")
	public String signupSubmit(SignupRequestDto signupRequestDto) {
		boolean result = authService.signup(signupRequestDto);
		StringBuilder builder = new StringBuilder();
		if(result) {
			builder.append("<script>");
			builder.append("alert(\"회원가입 완료.\");");
			builder.append("location.replace(\"/song/auth/signin\")");
			builder.append("</script>");
		}else {
			builder.append("<script>");
			builder.append("alert(회원가입 실패)");
			builder.append("history.back()");
			builder.append("</script>");
		}
		return builder.toString();
	}
	@ResponseBody
	@RequestMapping(value ="/auth/username/check", method = RequestMethod.GET)
	public String usernameCheck(String username) {
		return Boolean.toString(authService.checkUsername(username));
	}
}
