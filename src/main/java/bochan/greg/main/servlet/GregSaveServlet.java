package bochan.greg.main.servlet;

import java.io.BufferedWriter;
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
    enum SolveMethod {
        ROUX,
        CFOP;
    }

    public GregSaveServlet() {
        super();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String solvesBase64 = request.getParameter("solves");

        String solveMethod = request.getParameter("solveMethod");

        String responseString = "";

        try {
            SolveMethod.valueOf(solveMethod.toUpperCase());

            File solveFile = new File(String.format("solve_%s.txt", solveMethod.toLowerCase()));

            if (!solveFile.exists())
                solveFile.createNewFile();

            try (BufferedWriter bw = new BufferedWriter(new FileWriter(solveFile))) {
                bw.write(solvesBase64);
                bw.flush();
            } catch (Throwable t1) {
                responseString = "Error writing to server file.\n" + t1.getMessage();
            }
        } catch (Throwable t2) {
            responseString = "Invalid solve method.\n" + t2.getMessage();
        }

        response.getWriter().write(responseString);
    }
}