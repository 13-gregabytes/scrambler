package bochan.greg.main.servlet;

import net.gnehzr.tnoodle.server.webscrambles.ScrambleHandler;
import net.gnehzr.tnoodle.server.webscrambles.ScrambleViewHandler;
import net.gnehzr.tnoodle.utils.BadLazyClassDescriptionException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class GregViewServlet extends ScrambleViewHandler {
    public GregViewServlet() throws IOException, BadLazyClassDescriptionException {
        super();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        super.doGet(request, response);
    }
}