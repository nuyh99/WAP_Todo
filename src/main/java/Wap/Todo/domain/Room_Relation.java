package Wap.Todo.domain;

public class Room_Relation {
    private Long id;
    private Long room_num;
    private String user_id;

    public Room_Relation(Long id, Long room_num, String user_id) {
        this.id = id;
        this.room_num = room_num;
        this.user_id = user_id;
    }

    public Room_Relation() {
    }

    @Override
    public String toString() {
        return "Room_Relation{" +
                "id=" + id +
                ", room_num=" + room_num +
                ", user_id='" + user_id + '\'' +
                '}';
    }

    public Long getRoom_num() {
        return room_num;
    }

    public void setRoom_num(Long room_num) {
        this.room_num = room_num;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }
}
