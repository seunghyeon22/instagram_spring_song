package com.instagram.song.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.instagram.song.domain.user.User;

public class AuthFilter implements Filter {
@Override
public void init(FilterConfig filterConfig) throws ServletException {
	// TODO Auto-generated method stub
	
}

@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpServletRequest = (HttpServletRequest)request;
		HttpServletResponse httpServletResponse = (HttpServletResponse)response;
	
		HttpSession session = httpServletRequest.getSession();
		User user = (User)session.getAttribute("principal");
		
		String path = httpServletRequest.getRequestURI();
		
		System.out.println(path);
		if(path.contains("/song/auth")) {
			System.out.println(user);
			if(user!=null) {
				System.out.println("실행");
				httpServletResponse.sendRedirect("/song/");
				return;
			}
		}else if(path.contains("/song/static")) {
			
		}else {
			if(user==null) {
			httpServletResponse.sendRedirect("/song/auth/signin");
			return;
			}
		}
		chain.doFilter(httpServletRequest, httpServletResponse);
		
	}
@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}
}
