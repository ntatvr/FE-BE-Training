package com.example.spring.service;

import java.io.IOException;
import java.util.HashSet;

public interface CrawlerService {

	
	/**
	 * Gets the page links.
	 *
	 * @param url the URL
	 * @param query the html query
	 * @return the page links
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
  HashSet<String> getPageLinks(String url, String query)  throws IOException ;
}
