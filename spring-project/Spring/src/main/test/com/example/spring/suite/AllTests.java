package com.example.spring.suite;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;
import com.example.spring.utils.CookieUtilsTest;

@RunWith(Suite.class)
@SuiteClasses({
  CookieUtilsTest.class
})
public class AllTests {

}
