package recepti_type1.backend_java.Services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;


@Service
public class TranslationService
{
    public void translateText(String text, String targetLanguage) throws IOException
    {
        try
        {
            String urlString = "https://libretranslate.de/translate";
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setConnectTimeout(10000);
            connection.setReadTimeout(10000);

            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setRequestProperty("Content-Type", "application/json");

            JSONObject requestData = new JSONObject();
            requestData.put("q", text);
            requestData.put("source", "auto");
            requestData.put("target", targetLanguage);
            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = requestData.toString().getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int status = connection.getResponseCode();
            if (status != 200) {
                System.err.println("Error: Unable to get a successful response from the API.");
                return;  // Exit the method if the API request fails
            }

            StringBuilder response = new StringBuilder();
            try (BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"))) {
                String inputLine;
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
            }

            JSONObject jsonResponse = new JSONObject(response.toString());
            String translatedName = jsonResponse.getJSONArray("translatedText").getString(0);

            writeToJsonFile(text, translatedName);
        }
        catch (IOException e)
        {
            System.err.println("IOException occurred: " + e.getMessage());
            e.printStackTrace();
        }
        catch (Exception e)
        {
            System.err.println("An error occurred: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void writeToJsonFile(String key, String value) throws IOException
    {
        try
        {
            File file = new File("K:/Recepti-Type-1/src/Front/src/assets/locales/en.json");
            StringBuilder jsonContent = new StringBuilder();
            try (BufferedReader br = new BufferedReader(new FileReader(file)))
            {
                String line;
                while ((line = br.readLine()) != null)
                {
                    jsonContent.append(line);
                }
            }

            JSONObject jsonObject = new JSONObject(jsonContent.toString());

            jsonObject.put(key, value);

            try (BufferedWriter writer = new BufferedWriter(new FileWriter(file)))
            {
                writer.write(jsonObject.toString(4));
            }

        }
        catch (IOException e)
        {
            System.err.println("IOException while writing to file: " + e.getMessage());
            e.printStackTrace();
        }
        catch (Exception e)
        {
            System.err.println("An error occurred while writing to the file: " + e.getMessage());
            e.printStackTrace();
        }
    }

    //https://cloud.google.com/translate/pricing#basic-pricing //za cenu prvih 500k karaktera je besplatno posle se placa
    // GOOGLE CLOUD API
    /*private static final String TRANSLATION_API_URL = "https://translation.googleapis.com/language/translate/v2";
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
    }*/
}
