package com.instagram.song.service;

import com.instagram.song.web.dto.auth.SignupRequestDto;

public interface AuthService {
	public boolean signup(SignupRequestDto signupRequestDto);
	public boolean checkUsername(String username);
}
