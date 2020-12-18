package com.doctormono.user.rest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.doctormono.user.jwt.JWTFilter;
import com.doctormono.user.jwt.TokenProvider;
import com.doctormono.user.dto.LoginDto;

import javax.validation.Valid;

/**
 * Controller to authenticate users.
 */
@RestController
@RequestMapping("/api")
public class AuthenticationRestController {

   private final TokenProvider tokenProvider;

   private final AuthenticationManagerBuilder authenticationManagerBuilder;

   public AuthenticationRestController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
      this.tokenProvider = tokenProvider;
      this.authenticationManagerBuilder = authenticationManagerBuilder;
   }

   @PostMapping("/authenticate")
   public ResponseEntity<JWTToken> authorize(@Valid @RequestBody LoginDto loginDto) {

      UsernamePasswordAuthenticationToken authenticationToken =
         new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

      Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
      SecurityContextHolder.getContext().setAuthentication(authentication);

      boolean rememberMe = (loginDto.isRememberMe() == null) ? false : loginDto.isRememberMe();
      String jwt = tokenProvider.createToken(authentication, rememberMe);

      HttpHeaders httpHeaders = new HttpHeaders();
      httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

      return new ResponseEntity<>(new JWTToken(jwt, loginDto.getUsername()), httpHeaders, HttpStatus.OK);
   }

   /**
    * Object to return as body in JWT Authentication.
    */
   static class JWTToken {

      private String token;
      private String username;

      JWTToken(String token, String username) {
         this.token = token;
         this.username = username;
      }

      public String getToken() {
         return token;
      }

      public void setToken(String token) {
         this.token = token;
      }

      public String getUsername() {
         return username;
      }

      public void setUsername(String username) {
         this.username = username;
      }
   }
}
