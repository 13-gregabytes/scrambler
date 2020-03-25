package bochan.greg.main;

import bochan.greg.main.filter.GregCORSFilter;
import bochan.greg.main.servlet.GregSaveServlet;
import bochan.greg.main.servlet.GregScrambleServlet;
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
        ServletRegistrationBean bean = new ServletRegistrationBean(new GregScrambleServlet(), "/scramble/*");
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
    public ServletRegistrationBean registerSaveServlet() {
        ServletRegistrationBean bean = new ServletRegistrationBean(new GregSaveServlet(), "/save");
        bean.setLoadOnStartup(1);
        return bean;
    }

    @Bean
    public FilterRegistrationBean registerScrambleFilter() {
        FilterRegistrationBean bean = new FilterRegistrationBean(new GregCORSFilter());

        bean.addUrlPatterns("/*");

        return bean;
    }

    public static void main(String[] args) {
        SpringApplication.run(CubeShuffleApplication.class, args);
    }
}
