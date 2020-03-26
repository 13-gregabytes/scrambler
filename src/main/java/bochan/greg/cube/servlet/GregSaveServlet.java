package bochan.greg.cube.servlet;

import bochan.greg.cube.utils.GregUtils;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Base64;

public class GregSaveServlet extends HttpServlet {

    public GregSaveServlet() {
        super();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String solvesBase64 = request.getParameter("solves");

        String solveMethod = request.getParameter("solveMethod");

        String responseString = "";

        SolveMethod method = null;

        try {
            method = SolveMethod.valueOf(solveMethod.toUpperCase());
        } catch (Throwable t2) {
            responseString = "Invalid solve method.\n" + t2.getMessage();
        }

        if (method != null) {

            try {
                String solveJsonString = new String(Base64.getDecoder().decode(solvesBase64.getBytes()));

                JSONArray solveJsonArray = (JSONArray) new JSONParser(JSONParser.MODE_PERMISSIVE).parse(solveJsonString);

                for (Object object : solveJsonArray) {
                    JSONObject solveJson = (JSONObject) object;
                    String scramble = solveJson.getAsString("scramble");
                    String time = solveJson.getAsString("time");
                    String date = solveJson.getAsString("time");

                    GregUtils.validateSolveObject(scramble, time, date);
                }
            } catch (Throwable t3) {
                responseString = "Invalid solve data.\n" + t3.getMessage();
            }

            File solveFile = new File(method.getFilename());

            if (!solveFile.exists())
                solveFile.createNewFile();

            try (BufferedWriter bw = new BufferedWriter(new FileWriter(solveFile))) {
                bw.write(solvesBase64);
                bw.flush();
            } catch (Throwable t1) {
                responseString = "Error writing to server file.\n" + t1.getMessage();
            }
        }

        response.getWriter().write(responseString);
    }
}