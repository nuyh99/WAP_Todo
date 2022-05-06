package Wap.Todo.controller;

import Wap.Todo.domain.Room;
import Wap.Todo.service.RoomService;
import Wap.Todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;


@Controller
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @DeleteMapping("/{room_num}")
    @ResponseBody
    public Long deleteRoom(@PathVariable("room_num") Long num, HttpSession session){

        String id = (String)session.getAttribute("memberId");

        Long room_num = roomService.deleteRoom(num, id);
        return room_num;
    }

    @PostMapping("/invite")
    @ResponseBody
    public String createRoom(@RequestBody String introduce, HttpSession session){

        String id = (String)session.getAttribute("memberId");
        Room room = roomService.joinRoom(introduce,id);

        return room.toString();
    }



}
