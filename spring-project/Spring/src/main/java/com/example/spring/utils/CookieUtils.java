package com.example.spring.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;

/**
 * The Class CookieUtils is used to determine method related to Cookie.
 * 
 * @author AnhNT
 */
public class CookieUtils {

	/**
	 * Creates the cookie.
	 *
	 * @param response the {@link HttpServletResponse}
	 * @param key the name of cookie
	 * @param value the value of cookie
	 * @param maxAge the max age of cookie
	 * @param httpOnly the HTTPOnly flag
	 * @param secure the secure flag
	 */
	public static void createCookie(HttpServletResponse response, String key,
			String value, int maxAge, boolean httpOnly, boolean secure) {

		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(maxAge);
		cookie.setPath(Constants.SLASH);
		cookie.setHttpOnly(httpOnly);
		cookie.setSecure(secure);
		response.addCookie(cookie);
	}

	
	/**
	 * Removes the cookie by key.
	 * 
	 * To delete a cookie, we need to create a cookie that have the same name
	 * with the cookie that we want to delete. We also need to set the max age
	 * of the cookie to 0 and then add it to the Servlet's response method.
	 *
	 * @param response the {@link HttpServletResponse}
	 * @param key the name of cookie
	 */
	public static void removeCookie(HttpServletResponse response, String key) {

		Cookie cookie = new Cookie(key, StringUtils.EMPTY);
		cookie.setMaxAge(0);
		response.addCookie(cookie);
	}
}
