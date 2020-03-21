package org.wirvsvirushackathon.digitalbar.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/helloworld")
public class HelloWorldResource {

    @RequestMapping("/hello")
    public String helloWorld() {
        return "Hello World";
    }

}