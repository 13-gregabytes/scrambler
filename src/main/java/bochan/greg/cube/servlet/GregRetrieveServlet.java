package bochan.greg.cube.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

public class GregRetrieveServlet extends HttpServlet {
    enum SolveMethod {
        ROUX,
        CFOP;
    }

    public GregRetrieveServlet() {
        super();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String responseString = "";

        String solveMethod = request.getParameter("solveMethod");

        try {
            SolveMethod.valueOf(solveMethod.toUpperCase());

            File solveFile = new File(String.format("solve_%s.txt", solveMethod.toLowerCase()));

            if (solveFile.exists()) {
                try (BufferedReader br = new BufferedReader(new FileReader(solveFile))) {
                    String line = null;
                    while ((line = br.readLine()) != null) {
                        responseString += line;
                    }
                } catch (Throwable t1) {
                    responseString = "Error reading from server file.\n" + t1.getMessage();
                }
            }
        } catch (Throwable t2) {
            responseString = "Invalid solve method.\n" + t2.getMessage();
        }

        response.getWriter().write(responseString);
    }
}