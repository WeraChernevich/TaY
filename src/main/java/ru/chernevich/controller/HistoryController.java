package ru.chernevich.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.chernevich.dto.HistoryDto;
import ru.chernevich.entity.History;
import ru.chernevich.repository.HistoryRepository;
import ru.chernevich.repository.UserRepository;
import ru.chernevich.service.HistoryService;
import ru.chernevich.service.UserServise;

import java.util.List;

@RestController
@RequestMapping("/api/histories")
public class HistoryController {

    private final HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping
    public ResponseEntity<List<HistoryDto>> getAllHistories() {
        return ResponseEntity.ok(historyService.getAllHistories());
    }

    @PostMapping
    public ResponseEntity<HistoryDto> addHistory(@RequestBody HistoryDto historyDto) {
        return new ResponseEntity<>(historyService.addHistory(historyDto), HttpStatus.CREATED);
    }
}
