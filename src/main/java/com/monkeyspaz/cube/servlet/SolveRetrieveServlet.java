package com.monkeyspaz.cube.servlet;

import com.monkeyspaz.cube.utils.CubeUtils;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Base64;

public class SolveRetrieveServlet extends HttpServlet {

    public SolveRetrieveServlet() {
        super();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String responseString = "";

        String solveMethod = request.getParameter("solveMethod");
        String puzzleType = request.getParameter("puzzleType");

        String path = request.getServletContext().getRealPath("'");
        path = path.substring(0, path.length() - 1);
        path += "../";

        String fileName = "unknown";

        CubeUtils.SolveMethod method = null;
        CubeUtils.PuzzleType puzzle = null;

        String solvesBase64 = "";

        try {
            method = CubeUtils.SolveMethod.valueOf(solveMethod.toUpperCase());
            puzzle = CubeUtils.PuzzleType.init(puzzleType);
            fileName = method.getFilename(puzzle);

            File solveFile = new File(path + fileName);

            if (solveFile.exists()) {
                try (BufferedReader br = new BufferedReader(new FileReader(solveFile))) {
                    String line = null;

                    while ((line = br.readLine()) != null) {
                        solvesBase64 += line;
                    }

                    responseString = solvesBase64;
                } catch (Throwable t1) {
                    responseString = "Error reading from server file.\n" + t1.getMessage();
                }
            }
        } catch (Throwable t2) {
            responseString = "Invalid solve method.\n" + t2.getMessage();
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Max-Age", "86400");

        try (PrintWriter out = response.getWriter()) {
            out.write(responseString);
            out.flush();
        }
    }
}