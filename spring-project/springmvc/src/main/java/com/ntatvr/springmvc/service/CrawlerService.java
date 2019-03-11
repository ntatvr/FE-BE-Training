package com.ntatvr.springmvc.service;

import java.io.IOException;
import java.util.HashSet;

public interface CrawlerService {

	
	/**
	 * Gets news
	 *
	 * @param url the URL
	 * @return the page links
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
  HashSet<String> getNews(String url)  throws IOException ;
}
