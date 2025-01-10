package ru.chernevich.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.chernevich.dto.HistoryDto;
import ru.chernevich.entity.History;
import ru.chernevich.repository.HistoryRepository;
import ru.chernevich.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HistoryService {
    private final HistoryRepository historyRepository;
    private final UserRepository userRepository;

    public List<HistoryDto> getAllHistories() {
        return historyRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public HistoryDto addHistory(HistoryDto historyDto) {
        History history = convertToEntity(historyDto);
        History savedHistory = historyRepository.save(history);
        return convertToDto(savedHistory);
    }
    private HistoryDto convertToDto(History history) {
        HistoryDto historyDto = new HistoryDto();
        historyDto.setId(history.getId());
        historyDto.setHistory(history.getHistory());
        historyDto.setDate(history.getDateTime());
        return historyDto;
    }
    private History convertToEntity(HistoryDto historyDto) {
        History history = new History();
        history.setHistory(historyDto.getHistory());
        history.setDateTime(historyDto.getDate());
        userRepository.findById(historyDto.getId()).ifPresent(history::setUserId);
        return history;
    }
}
