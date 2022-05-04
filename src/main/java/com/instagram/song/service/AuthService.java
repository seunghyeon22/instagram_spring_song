package com.instagram.song.service;

import com.instagram.song.domain.user.User;
import com.instagram.song.web.dto.auth.SignupRequestDto;

public interface AuthService {
	public boolean signup(SignupRequestDto signupRequestDto);
	public boolean checkUsername(String username);
	public User loadUsername(String username);
	public boolean passwordCheck(String password, User user);
	public User signin(String username, String password);
}
