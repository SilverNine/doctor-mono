package com.doctormono.user.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AdminProtectedRestController {

   @GetMapping("/hiddenmessage")
   //@PreAuthorize("hasAnyRole('ADMIN')")
   public ResponseEntity<HiddenMessage> getAdminProtectedGreeting() {
      return ResponseEntity.ok(new HiddenMessage("this is a hidden message!"));
   }

   private static class HiddenMessage {

      private final String message;

      private HiddenMessage(String message) {
         this.message = message;
      }

      public String getMessage() {
         return message;
      }
   }
}
