package com.doctormono.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;
import com.doctormono.user.JwtAccessDeniedHandler;
import com.doctormono.user.JwtAuthenticationEntryPoint;
import com.doctormono.user.jwt.JWTConfigurer;
import com.doctormono.user.jwt.TokenProvider;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
   private final TokenProvider tokenProvider;
   private final CorsFilter corsFilter;
   private final JwtAuthenticationEntryPoint authenticationErrorHandler;
   private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

   public WebSecurityConfig(
      TokenProvider tokenProvider,
      CorsFilter corsFilter,
      JwtAuthenticationEntryPoint authenticationErrorHandler,
      JwtAccessDeniedHandler jwtAccessDeniedHandler
   ) {
      this.tokenProvider = tokenProvider;
      this.corsFilter = corsFilter;
      this.authenticationErrorHandler = authenticationErrorHandler;
      this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
   }

   // Configure BCrypt password encoder =====================================================================

   @Bean
   public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
   }

   // Configure paths and requests that should be ignored by Spring Security ================================

   @Override
   public void configure(WebSecurity web) {
      web.ignoring()
         .antMatchers(
            "/",
            "/favicon.ico",
            "/**/*.html",
            "/**/*.woff2",
            "/**/*.map",
            "/**/*.css",
            "/**/*.js",
            "/img/**",
            "/h2-console/**"
         );
   }

   // Configure user settings ===========================================================================

   @Override
   protected void configure(HttpSecurity httpSecurity) throws Exception {
      httpSecurity
              // we don't need CSRF because our token is invulnerable
              .csrf().disable()

              .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)

              .exceptionHandling()
              .authenticationEntryPoint(authenticationErrorHandler)
              .accessDeniedHandler(jwtAccessDeniedHandler)

              // enable h2-console
              .and()
              .headers()
              .frameOptions()
              .sameOrigin()

              // create no session
              .and()
              .sessionManagement()
              .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

              .and()
              .authorizeRequests()
              .antMatchers("/").permitAll()
              .antMatchers("/api/authenticate").permitAll()
              .antMatchers("/api/person").hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")
              .antMatchers("/api/hiddenmessage").hasAuthority("ROLE_ADMIN")

              .anyRequest().authenticated()

              .and()
              .apply(securityConfigurerAdapter());
   }

   private JWTConfigurer securityConfigurerAdapter() {
      return new JWTConfigurer(tokenProvider);
   }
}
