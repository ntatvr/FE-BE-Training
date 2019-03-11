package com.ntatvr.springmvc.service.impl;

import java.io.IOException;
import java.util.HashSet;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import com.ntatvr.springmvc.service.CrawlerService;


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
  public HashSet<String> getNews(String url) throws IOException {

    HashSet<String> pageLinks = new HashSet<String>();
    Document document = Jsoup.connect(url).get();
    Elements news = document.select(".ctn_mainCates_sb").select(".titleTypPost");

    // Use the abs: attribute prefix to resolve an absolute URL from an attribute
    news.forEach(item -> {
      Elements links = item.select("a[href]");
      links.forEach(link -> pageLinks.add(link.children().html()));
    });

    return pageLinks;
  }

}
