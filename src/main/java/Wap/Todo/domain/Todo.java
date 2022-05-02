package Wap.Todo.domain;

import java.util.Date;

public class Todo {
    private Long id;
    private Long room_num;
    private Date deadline;
    private String content;
    private Status status;
    private Date date;

    public Todo(Long id, Long room_num, Date deadline, String content, Status status, Date date) {
        this.id = id;
        this.room_num = room_num;
        this.deadline = deadline;
        this.content = content;
        this.status = status;
        this.date = date;
    }

    public Todo(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", room_num=" + room_num +
                ", deadline=" + deadline +
                ", content='" + content + '\'' +
                ", status=" + status +
                ", date=" + date +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRoom_num() {
        return room_num;
    }

    public void setRoom_num(Long room_num) {
        this.room_num = room_num;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
