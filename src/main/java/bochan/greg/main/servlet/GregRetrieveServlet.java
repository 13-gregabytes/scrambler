package bochan.greg.main.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Base64;

public class GregRetrieveServlet extends HttpServlet {
    public GregRetrieveServlet() {
        super();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        File solveFile = new File("solve_file.txt");

        String solvesBase64 = "";

        if (solveFile.exists()) {
            try (BufferedReader br = new BufferedReader(new FileReader(solveFile))) {
                String line = null;
                while ((line = br.readLine()) != null) {
                    solvesBase64 += line;
                }
            } catch (Exception e) {
            }

            response.getWriter().write(solvesBase64);
        }
    }
}