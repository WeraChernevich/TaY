package ru.chernevich.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.chernevich.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
