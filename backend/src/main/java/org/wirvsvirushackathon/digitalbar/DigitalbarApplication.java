package org.wirvsvirushackathon.digitalbar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class DigitalbarApplication {

	public static void main(String[] args) {
		SpringApplication.run(DigitalbarApplication.class, args);
	}

}
