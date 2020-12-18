package com.doctormono.config;


import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;


@Controller
public class DefaultController implements ErrorController {
    @GetMapping(value = {"", "/error"}, produces = {"text/html"})
    public String index() {
        return "index.html";
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}