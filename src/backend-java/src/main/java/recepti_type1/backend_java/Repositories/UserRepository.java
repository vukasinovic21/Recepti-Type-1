package recepti_type1.backend_java.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import recepti_type1.backend_java.Models.User;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID>
{

    @Query("SELECT u FROM User u WHERE u.Email = :email")
    Optional<User> findByEmail(@Param("email") String email);

    //Optional<User> findByEmail(String Email); //mapira mi pogresno email umesto Email ?!
}