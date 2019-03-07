package com.example.spring.service;

import java.io.IOException;
import java.util.HashSet;

public interface CrawlerService {

	
	/**
	 * Gets the page links.
	 *
	 * @param url the url
	 * @return the page links
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	HashSet<String> getPageLinks(String url)  throws IOException ;
}
