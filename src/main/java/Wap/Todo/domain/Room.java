package Wap.Todo.domain;

public class Room {
    private Long room_num;
    private String room_master_id;
    private String introduce;
    private String invite_code;

    public Room() {
    }

    @Override
    public String toString() {
        return "Room{" +
                "room_num=" + room_num +
                ", room_master_id='" + room_master_id + '\'' +
                ", introduce='" + introduce + '\'' +
                ", invite_code='" + invite_code + '\'' +
                '}';
    }

    public Room(Long room_num, String room_master_id, String introduce, String invite_code) {
        this.room_num = room_num;
        this.room_master_id = room_master_id;
        this.introduce = introduce;
        this.invite_code = invite_code;
    }

    public Long getRoom_num() {
        return room_num;
    }

    public void setRoom_num(Long room_num) {
        this.room_num = room_num;
    }

    public String getRoom_master_id() {
        return room_master_id;
    }

    public void setRoom_master_id(String room_master_id) {
        this.room_master_id = room_master_id;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public String getInvite_code() {
        return invite_code;
    }

    public void setInvite_code(String invite_code) {
        this.invite_code = invite_code;
    }
}
