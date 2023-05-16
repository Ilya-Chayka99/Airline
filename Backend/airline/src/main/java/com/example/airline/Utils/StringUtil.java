package com.example.airline.Utils;

public class StringUtil {

    public static String generateStringWithAlphabet(String alphabet, int length) {
        StringBuilder ret = new StringBuilder();
        while (ret.length() < length) {
            ret.append(alphabet.charAt((int) Math.round(Math.random()*(alphabet.length()-1))) );
        }
        return ret.toString();
    }

    public static String maskString(String input, int visibleChars) {
        if (input == null || input.length() == 0) {
            return input;
        }

        input = input.trim();
        int length = input.length();
        int endIndex = Math.min(visibleChars, length);

        StringBuilder maskedString = new StringBuilder();
        for (int i = 0; i < length; i++) {
            if (i < endIndex || input.charAt(i) == ' ') {
                maskedString.append(input.charAt(i));
            } else {
                maskedString.append('*');
            }
        }

        if (length > visibleChars) {
            maskedString.append(input.substring(visibleChars));
        }

        return maskedString.toString();
    }

}