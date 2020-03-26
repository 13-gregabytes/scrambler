package bochan.greg.cube.utils;

import bochan.greg.cube.exception.DateParseException;
import bochan.greg.cube.exception.ScrambleParseException;
import bochan.greg.cube.exception.TimeParseException;

import java.net.SocketException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GregUtils {
    public final static Pattern SCRAMBLE_PATTERN = Pattern.compile("^[UDLRFB '2]+$");
    public final static Pattern TIME_PATTERN = Pattern.compile("^[0-9]{2}:[0-9]{2}\\.[0-9]{2}$");
    public final static Pattern DATE_PATTERN = Pattern.compile("^[0-9]{13}$");

    public enum SolveMethod {
        ROUX,
        CFOP;

        public String getFilename () {
            return String.format("solve_%s.txt", this.toString().toLowerCase());
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
