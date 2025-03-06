package recepti_type1.backend_java.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import recepti_type1.backend_java.Models.User;
import recepti_type1.backend_java.Repositories.UserRepository;

import java.util.List;
import java.util.UUID;

@Service
public class UserService
{
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public String hashPassword(String password)
    {
        return passwordEncoder.encode(password);
    }

    public boolean verifyPassword(String rawPassword, String hashedPassword)
    {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }

    public List<User> getAllUsers()
    {
        return userRepository.findAll();
    }

    public User getUserById(UUID userId)
    {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found for ID: " + userId));
    }

    public User getUserByEmail(String email)
    {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found for email: " + email));
    }

    public void savePassword(User u)
    {
        userRepository.save(u);
    }

    public void updateUser(User u)
    {
        userRepository.save(u);
    }
}
