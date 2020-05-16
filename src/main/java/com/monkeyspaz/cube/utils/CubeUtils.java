package com.monkeyspaz.cube.utils;

import com.monkeyspaz.cube.exception.DateParseException;
import com.monkeyspaz.cube.exception.ScrambleParseException;
import com.monkeyspaz.cube.exception.TimeParseException;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CubeUtils {
    public final static Pattern SCRAMBLE_PATTERN = Pattern.compile("^[UDLRFB '2]+$");
    public final static Pattern TIME_PATTERN = Pattern.compile("^[0-9]{2}:[0-9]{2}\\.[0-9]{2}$");
    public final static Pattern DATE_PATTERN = Pattern.compile("^[0-9]{13}$");

    public enum SolveMethod {
        ROUX,
        CFOP;

        public String getFilename (PuzzleType puzzleType) {
            return String.format("solve_%s_%s.txt", this.toString().toLowerCase(), puzzleType.toString());
        }
    }

    public enum PuzzleType {
        TWO_X_TWO("222"),
        THREE_X_THREE("333");

        String puzzleType = null;

        private PuzzleType(String puzzleType) {
            this.puzzleType = puzzleType;
        }

        public static PuzzleType init(String puzzleType) {
            if ("222".equals(puzzleType))
                return TWO_X_TWO;
            else
                return THREE_X_THREE;
        }

        public String toString() {
          return this.puzzleType;
        }

        public String getFilename (SolveMethod solveMethod) {
            return String.format("solve_%s_%s.txt", solveMethod.toString().toLowerCase(), this.toString());
        }
    }

    public static boolean validateSolveObject(String scramble, String time, String date) throws ScrambleParseException, TimeParseException, DateParseException {
        boolean valid = false;

        Matcher scrambleMatcher = SCRAMBLE_PATTERN.matcher(scramble);

        if (scrambleMatcher.matches()) {
            Matcher timeMatcher = TIME_PATTERN.matcher(time);

            if (timeMatcher.matches()) {
                Matcher dateMatcher = DATE_PATTERN.matcher(date);

                if (dateMatcher.matches()) {
                    valid = true;
                } else {
                    throw new DateParseException("Date is not valid");
                }
            } else {
                throw new TimeParseException("Time is not valid");
            }
        } else {
            throw new ScrambleParseException("Scramble is not valid");
        }

        return valid;
    }
}
