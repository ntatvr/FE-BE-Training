package com.example.spring.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.example.spring.model.Crawler;
import com.example.spring.service.CrawlerService;

@Controller
public class CrawlerController {

  private static final Logger LOGGER = Logger.getLogger(CrawlerController.class);

  @Autowired
  private CrawlerService crawlerService;

  /**
   * Get page links.
   *
   * @param request the {@link HttpServletRequest}
   * @param response the {@link HttpServletResponse}
   * @return the page links
   * @throws IOException Signals that an I/O exception has occurred.
   */
  @RequestMapping(value = "/crawler", method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public @ResponseBody Crawler getPageLinks(@RequestParam("query") String query,
      HttpServletRequest request, HttpServletResponse response) throws IOException {

    LOGGER.debug("Call API /crawler");
    try {
      request.setCharacterEncoding("utf-8");
      response.setCharacterEncoding("utf-8");
    } catch (UnsupportedEncodingException e) {
      e.printStackTrace();
    }
    return new Crawler(crawlerService.getPageLinks("https://www.webtretho.com/forum/f26/", query));
  }
}
