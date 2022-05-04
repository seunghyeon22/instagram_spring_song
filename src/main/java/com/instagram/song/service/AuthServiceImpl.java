package com.instagram.song.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.song.domain.user.User;
import com.instagram.song.domain.user.UserRepository;
import com.instagram.song.web.dto.auth.SignupRequestDto;

@Service
public class AuthServiceImpl implements AuthService {
	@Autowired
	private UserRepository userRepository;


	@Override
	public boolean signup(SignupRequestDto signupRequestDto) {
		int result = userRepository.signup(signupRequestDto.toEntity());
		return result != 0;
	}

	@Override
	public boolean checkUsername(String username) {
		return userRepository.checkUsername(username) != 0;
	}
	@Override
	public User loadUsername(String username) {
		return userRepository.getUsername(username);
	}

	@Override
	public boolean passwordCheck(String password, User user) {
		if (BCrypt.checkpw(password, user.getPassword())) {
			return true;
		} else {
			return false;
		}
	}
	@Override
	public User signin(String username, String password) {	
		User user = loadUsername(username);
		if(user!=null) {
			passwordCheck(password, user);
			return null;
		}

		return user;
	}
}
