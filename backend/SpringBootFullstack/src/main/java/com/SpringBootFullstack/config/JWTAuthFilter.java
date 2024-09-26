package com.SpringBootFullstack.config;

import com.SpringBootFullstack.service.JWTUtils;
import com.SpringBootFullstack.service.UsersDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Security;

@Component
public class JWTAuthFilter  extends OncePerRequestFilter {

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private UsersDetailsService usersDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader=request.getHeader("Authorization");
        final String jwtTokens;
        final String userEmail;

        if(authHeader==null||authHeader.isBlank()){
            filterChain.doFilter(request,response);
            return;
        }
        jwtTokens =authHeader.substring(7);
        userEmail=jwtUtils.extractUsername(jwtTokens);
        System.out.println("Extracted User Email: "+ userEmail);

        if(userEmail !=null && SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetails = usersDetailsService.loadUserByUsername(userEmail);

            if(jwtUtils.isTokenValid(jwtTokens,userDetails)){
                SecurityContext securityContext=SecurityContextHolder.createEmptyContext();
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                  userDetails,null,userDetails.getAuthorities()
                );
                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                securityContext.setAuthentication(token);
                SecurityContextHolder.setContext(securityContext);
                System.out.println("Authentication set for user: " + userEmail);
                System.out.println("User Authorities: " + userDetails.getAuthorities());

            }else{
                System.out.println("Invalid token for user: " + userEmail);
            }
        }
        filterChain.doFilter(request,response);
    }
}
