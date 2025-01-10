package ru.chernevich.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.chernevich.dto.UserDto;
import ru.chernevich.entity.User;
import ru.chernevich.repository.HistoryRepository;
import ru.chernevich.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServise {
    private final HistoryRepository historyRepository;
    private final UserRepository userRepository;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    };

    public UserDto addUser(UserDto userDto) {
        User user = convertToEntity(userDto);
        User savedUser = userRepository.save(user);
        return convertToDto(savedUser);
    }

    private UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setProfession(user.getProfession());
        userDto.setImage(user.getImage());
        return userDto;
    }

    private User convertToEntity(UserDto userDto) {
        User user = new User();
        user.setName(userDto.getName());
        user.setProfession(userDto.getProfession());
        user.setImage(userDto.getImage());
        return user;
    }
}
