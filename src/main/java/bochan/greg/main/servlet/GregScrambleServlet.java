package bochan.greg.main.servlet;

import net.gnehzr.tnoodle.server.webscrambles.ScrambleHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class GregScrambleServlet extends ScrambleHandler {
    public GregScrambleServlet() {
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        super.doGet(request, response);
    }
}