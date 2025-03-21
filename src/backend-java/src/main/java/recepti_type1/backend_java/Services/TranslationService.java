package recepti_type1.backend_java.Services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;


@Service
public class TranslationService
{
    //https://cloud.google.com/translate/pricing#basic-pricing //za cenu prvih 500k karaktera je besplatno posle se placa
    private static final String TRANSLATION_API_URL = "https://translation.googleapis.com/language/translate/v2";
    private static final String API_KEY = "GOOGLE_API_KEY";

    public String translateToEnglish(String text)
    {
        String url = String.format("%s?key=%s&q=%s&target=en", TRANSLATION_API_URL, API_KEY, text);

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        JSONObject jsonResponse = new JSONObject(response);
        return jsonResponse.getJSONObject("data").getJSONArray("translations").getJSONObject(0).getString("translatedText");
    }

    // Add the translated name to the en.json file
    public void addToJsonFile(String originalName, String translatedName) throws IOException
    {
        String filePath = "\"K:\\Recepti-Type-1\\src\\Front\\src\\assets\\locales\\en.json\"";

        JSONObject json = new JSONObject(new String(Files.readAllBytes(Paths.get(filePath))));

        json.put(originalName, translatedName);

        try (FileWriter file = new FileWriter(filePath))
        {
            file.write(json.toString(4));
        }
    }
}
