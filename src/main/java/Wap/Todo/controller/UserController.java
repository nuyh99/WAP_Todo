package Wap.Todo.controller;


import Wap.Todo.domain.Member;
import Wap.Todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller("/")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("asd")
    public String Test2(HttpServletRequest request){
        HttpSession session = request.getSession();

        session.setAttribute("sad", "123");

        return "Success";
    }

    //회원가입
    @PostMapping ("register")
    public String Test1(@RequestBody Member member){

        Member mem = userService.join(member);

        return mem.toString();
    }


    //로그인
    @PostMapping("login")
    @ResponseBody
    public String Test(@RequestBody Member member, HttpSession session){
        Member login = userService.login(member);
        if(login == null)
            return null;

        session.setAttribute("memberId", member.getId());

        return login.toString();
    }


    @GetMapping("/room/invite")
    @ResponseBody
    public String invite_room(HttpSession session){

        Object member = session.getAttribute("memberId");
        if(member == null)
            return null;

        return member.toString();
    }
}
