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
import java.net.URL;
import java.util.Base64;

public class SolveSaveServlet extends HttpServlet {

    public SolveSaveServlet() {
        super();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String solvesBase64 = request.getParameter("solves");
        String solveMethod = request.getParameter("solveMethod");
        String puzzleType = request.getParameter("puzzleType");

        String responseString = null;

        String path = request.getServletContext().getRealPath("'");
        path = path.substring(0, path.length() - 1);
        path += "../";

        String fileName = "unknown";

        CubeUtils.SolveMethod method = null;
        CubeUtils.PuzzleType puzzle = null;

        try {
            method = CubeUtils.SolveMethod.valueOf(solveMethod.toUpperCase());
            puzzle = CubeUtils.PuzzleType.init(puzzleType);
        } catch (Throwable t2) {
            responseString = "Invalid solve method.\n" + t2.getMessage();
        }

        if (method != null) {
            fileName = method.getFilename(puzzle);

            File solveFile = new File(path + fileName);

            if (!solveFile.exists())
                solveFile.createNewFile();

            try (BufferedWriter bw = new BufferedWriter(new FileWriter(solveFile))) {
                bw.write(solvesBase64);
                bw.flush();
            } catch (Throwable t1) {
                responseString = "Error writing to server file.\n" + t1.getMessage();
            }
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Max-Age", "86400");

        try (PrintWriter out = response.getWriter()) {
            if (responseString == null)
                out.write(responseString);
            else
                out.write(path + fileName);

            out.flush();
        }
    }
}