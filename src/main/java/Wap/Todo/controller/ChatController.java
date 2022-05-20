package Wap.Todo.controller;

import Wap.Todo.domain.Todo;
import Wap.Todo.dto.MessageDTO;
import Wap.Todo.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ChatController {
    private final SimpMessagingTemplate template;

    @Autowired
    public ChatController(SimpMessagingTemplate template, RoomService roomService) {
        this.template = template;
    }

    @MessageMapping("/chat")
    public void broadcasting(@Payload MessageDTO message) {
        template.convertAndSend("/topic/chat/"+message.getRoom(), message.getMessage());
    }
}
