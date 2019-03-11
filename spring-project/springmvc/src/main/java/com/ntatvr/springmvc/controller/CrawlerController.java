package com.ntatvr.springmvc.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ntatvr.springmvc.entity.Crawler;
import com.ntatvr.springmvc.service.CrawlerService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class CrawlerController {

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
  @RequestMapping(value = "/crawler/getNews", method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public @ResponseBody Crawler getPageLinks(HttpServletRequest request,
      HttpServletResponse response) throws IOException {

    log.debug("Call API /crawler");
    try {
      request.setCharacterEncoding("utf-8");
      response.setCharacterEncoding("utf-8");
    } catch (UnsupportedEncodingException e) {
      e.printStackTrace();
    }
    return new Crawler(crawlerService.getNews("https://www.webtretho.com/forum/f26/"));
  }
}
