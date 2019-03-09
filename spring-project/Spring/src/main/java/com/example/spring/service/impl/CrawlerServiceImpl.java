package com.example.spring.service.impl;

import java.io.IOException;
import java.util.HashSet;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import com.example.spring.service.CrawlerService;

/**
 * Crawler Service is used to determine some methods to crawler from the specific web sites.
 * 
 * Library: https://jsoup.org
 * 
 * @author AnhNT
 *
 */
@Service(value = "CrawlerService")
public class CrawlerServiceImpl implements CrawlerService {

  @Override
  public HashSet<String> getPageLinks(String url, String query) throws IOException {

    HashSet<String> pageLinks = new HashSet<String>();

    // 1. Fetch the HTML code
    Document document = Jsoup.connect(url).get();

    // 3. Parse the HTML to extract links to other URLs
    Elements linksOnPage = document.select(query);

    // Use the abs: attribute prefix to resolve an absolute URL from an attribute
    linksOnPage.forEach(link -> pageLinks.add(link.attr("abs:href")));

    return pageLinks;
  }

}
