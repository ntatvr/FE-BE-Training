package com.example.spring.utils;

import java.io.IOException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import com.example.spring.service.CrawlerService;

@RunWith(MockitoJUnitRunner.class)
public class CookieUtilsTest extends BaseTest {

  private CrawlerService crawlerService;

  @Before
  public void setUp() {
    crawlerService = Mockito.mock(CrawlerService.class);

  }

  @Test
  public void test() throws IOException {


  }

}
