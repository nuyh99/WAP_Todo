package Wap.Todo.controller;


import Wap.Todo.domain.Member;
import Wap.Todo.domain.Room;
import Wap.Todo.service.UserService;
import Wap.Todo.vo.RoomVO;
import lombok.experimental.Delegate;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.swing.*;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //중복 확인
    @GetMapping("/idDuplicated")
    @ResponseBody
    public boolean duplicate(@RequestBody Member member) {
        return userService.duplicate(member.getId());
    }

    //회원가입
    @PostMapping ("/register")
    @ResponseBody
    public Member register(@RequestBody Member member) throws NoSuchAlgorithmException {
        return userService.join(member);
    }

    //로그인
    @PostMapping("/login")
    @ResponseBody
    public Member login(@RequestBody Member member, HttpSession session) throws NoSuchAlgorithmException {
        Member login = userService.login(member);
        if(login == null)
            return null;

        session.setAttribute("memberId", member.getId());
        session.setAttribute("memberName", member.getName());

        return login;
    }

    @GetMapping("/logout")
    @ResponseBody
    public String logout(HttpSession session){
        session.invalidate();

        return "Success";
    }

    //방 목록 조회
    @GetMapping("/rooms")
    @ResponseBody
    public List<Room> roomView(HttpSession session){
        String id = (String)session.getAttribute("memberId");

        return new RoomVO(userService.getRoomsById(id)).getRooms();
    }

}
