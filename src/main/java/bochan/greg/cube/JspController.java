package bochan.greg.cube;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JspController {
  @RequestMapping("/")
  public String augmentedAuthoring() {
    return "index";
  }
}
