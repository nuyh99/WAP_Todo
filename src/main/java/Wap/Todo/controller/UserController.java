package Wap.Todo.controller;


import Wap.Todo.domain.Member;
import Wap.Todo.domain.Room;
import Wap.Todo.service.UserService;
import lombok.experimental.Delegate;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.swing.*;
import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;


    //회원가입
    @PostMapping ("/register")
    public String register(@RequestBody Member member){

        Member mem = userService.join(member);

        return mem.toString();
    }


    //로그인
    @PostMapping("/login")
    @ResponseBody
    public String dologin(@RequestBody Member member, HttpSession session){
        Member login = userService.login(member);
        if(login == null)
            return null;

        session.setAttribute("memberId", member.getId());

        return login.toString();
    }

    //방 목록 조회
    @GetMapping("/rooms")
    @ResponseBody
    public List<Room> roomView(HttpSession session){

        String id = (String)session.getAttribute("memberId");

        List<Room> rooms = userService.getRoomsById(id);

        return rooms;
    }

}
