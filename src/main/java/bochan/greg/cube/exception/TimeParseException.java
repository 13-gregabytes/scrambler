package bochan.greg.cube.exception;

public class TimeParseException extends Exception {
    public TimeParseException() {
        super();
    }

    public TimeParseException(String message) {
        super(message);
    }

    public TimeParseException(String message, Throwable cause) {
        super(message, cause);
    }

    public TimeParseException(Throwable cause) {
        super(cause);
    }

    public TimeParseException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
