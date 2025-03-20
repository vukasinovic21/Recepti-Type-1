package recepti_type1.backend_java;

import org.junit.jupiter.api.*;
import org.mockito.Mock;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class BackendJavaApplicationTests
{

	WebDriver driver;
	WebDriverWait wait;

	@BeforeAll
	public static void init()
	{
	}

	@BeforeEach // Ovo se izvrsava pre svih testova iz klase
    public void setUp()
	{
		System.setProperty("webdriver.chrome.driver", "D:\\DOWNLOADS\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe");

		driver = new ChromeDriver(); // Pravi novu instancu Chrome driver-a

		driver.get("http://localhost:4200/home"); // Da krene od Home page-a
		
		wait = new WebDriverWait(driver, Duration.ofSeconds(10)); // Ceka 10 sekundi an drajver
	}
	
	@DisplayName("First test")
	@Test // Jedan od testova u klasi
	void loadAllRecipes()
	{
		WebElement button = driver.findElement(By.xpath("/html/body/app-root/app-home/div/button"));

		assertTrue(button.isDisplayed());
		button.click();

		WebElement title = driver.findElement(By.xpath("/html/body/app-root/app-all-recipes/div[1]/div/h1"));

		assertTrue(title.isDisplayed());
	}


	@AfterEach // Ovo se izvrsava posle svih testova iz klase
	public void CloseConnection()
	{
		wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		driver.quit();
	}

	@AfterAll
	public static void cleanup()
	{
	}
}
