package com.monkeyspaz.cube;

import com.monkeyspaz.cube.filter.CubeCORSFilter;
import com.monkeyspaz.cube.servlet.SolveRetrieveServlet;
import com.monkeyspaz.cube.servlet.SolveSaveServlet;
import com.monkeyspaz.cube.servlet.CubeScrambleServlet;
import net.gnehzr.tnoodle.server.webscrambles.ScrambleViewHandler;
import net.gnehzr.tnoodle.utils.BadLazyClassDescriptionException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;

import java.io.IOException;

@SpringBootApplication
public class CubeShuffleApplication {

    @Bean
    public ServletRegistrationBean registerScrambleServlet() {
        ServletRegistrationBean bean = new ServletRegistrationBean(new CubeScrambleServlet(), "/scramble/*");
        bean.setLoadOnStartup(1);
        return bean;
    }

    @Bean
    public ServletRegistrationBean registerViewServlet() {
        ServletRegistrationBean bean = null;

        try {
            bean = new ServletRegistrationBean(new ScrambleViewHandler(), "/view/*");
            bean.setLoadOnStartup(1);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (BadLazyClassDescriptionException e) {
            e.printStackTrace();
        }

        return bean;
    }

    @Bean
    public ServletRegistrationBean registerRetrieveServlet() {
        ServletRegistrationBean bean = new ServletRegistrationBean(new SolveRetrieveServlet(), "/retrieve");
        bean.setLoadOnStartup(1);
        return bean;
    }

    @Bean
    public ServletRegistrationBean registerSaveServlet() {
        ServletRegistrationBean bean = new ServletRegistrationBean(new SolveSaveServlet(), "/save");
        bean.setLoadOnStartup(1);
        return bean;
    }

    @Bean
    public FilterRegistrationBean registerScrambleFilter() {
        FilterRegistrationBean bean = new FilterRegistrationBean(new CubeCORSFilter());

        bean.addUrlPatterns("/*");

        return bean;
    }

    public static void main(String[] args) {
        SpringApplication.run(CubeShuffleApplication.class, args);
    }
}
