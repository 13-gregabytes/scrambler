package bochan.greg.main.servlet;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Base64;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.gnehzr.tnoodle.server.webscrambles.ScrambleViewHandler;
import net.gnehzr.tnoodle.utils.BadLazyClassDescriptionException;

public class GregSaveServlet extends HttpServlet {
    public GregSaveServlet() {
        super();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String solvesBase64 = request.getParameter("solves");
        String solvesStr = new String(Base64.getDecoder().decode(solvesBase64));

        File solveFile = new File("solve_file.txt");

        if (!solveFile.exists())
            solveFile.createNewFile();

        try (FileWriter fw = new FileWriter(solveFile)) {
            fw.write(solvesStr);
            fw.flush();
        } catch (Exception e) {
        }
    }
}