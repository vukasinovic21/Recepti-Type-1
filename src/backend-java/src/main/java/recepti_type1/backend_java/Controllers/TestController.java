package recepti_type1.backend_java.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController
{
    @GetMapping("/first")
    public String getFirst()
    {
        return "Hello from first test in TestController.";
    }
}
