package com.instagram.song.domain.user;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepository{
	@Autowired
	private SqlSession session;
	private final String NAME_SPACE ="com.instagram.song.domain.user.UserRepository.";
	
	@Override
	public int signup(User user) {
		System.out.println("test");
		return session.insert(NAME_SPACE+"signup",user);	
	}
	
	@Override
	public int checkUsername(String username) {
		// TODO Auto-generated method stub
		System.out.println("testes");
		return session.selectOne(NAME_SPACE+"checkUsername",username);
	}
}
