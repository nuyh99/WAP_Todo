package Wap.Todo.vo;

import Wap.Todo.domain.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

@Getter
@NoArgsConstructor
public class RoomVO {
    List<Room> rooms;

    public RoomVO(List<Room> roomList) {
        this.rooms = new ArrayList<>();

        PriorityQueue<Room> pq = new PriorityQueue<>((o1, o2) -> (int) (o1.getNum() - o2.getNum()));
        pq.addAll(roomList);

        while(!pq.isEmpty())
            this.rooms.add(pq.poll());
    }
}
