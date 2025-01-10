package ru.chernevich.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.chernevich.entity.History;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

}
