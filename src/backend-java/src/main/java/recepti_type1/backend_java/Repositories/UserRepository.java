package recepti_type1.backend_java.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recepti_type1.backend_java.Models.TypeOfFood;
import recepti_type1.backend_java.Models.User;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID>
{
}