package bochan.greg.cube.exception;

public class ScrambleParseException extends Exception {
    public ScrambleParseException() {
        super();
    }

    public ScrambleParseException(String message) {
        super(message);
    }

    public ScrambleParseException(String message, Throwable cause) {
        super(message, cause);
    }

    public ScrambleParseException(Throwable cause) {
        super(cause);
    }

    public ScrambleParseException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
