package Wap.Todo.controller;

import Wap.Todo.dto.MessageDTO;
import Wap.Todo.dto.TodoDTO;
import Wap.Todo.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;


@Controller
public class ChatController {
    private final SimpMessagingTemplate template;
    private final RoomService roomService;

    @Autowired
    public ChatController(SimpMessagingTemplate template, RoomService roomService) {
        this.template = template;
        this.roomService = roomService;
    }

    //채팅
    @MessageMapping("/chat")
    public void broadcasting(@Payload MessageDTO message) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH시 mm분 ss초");
        message.setTime(LocalTime.now().format(formatter));

        template.convertAndSend("/topic/chat/"+message.getRoom(), message);
    }

    //투두 생성 및 수정
    @MessageMapping("/todo/{room}")
    public void updateTodo(@Payload TodoDTO todos, @DestinationVariable("room") String room) {
        System.out.println(todos.getTodos().size());
        todos.getTodos().forEach(o->roomService.updateTodo(Long.valueOf(room), o.convertToTodo(o)));

        template.convertAndSend("/topic/todo/"+room, roomService.getTodos(Long.valueOf(room)));
    }
}
