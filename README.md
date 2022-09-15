# 공동 Todo 프로젝트
Discord, Notion 처럼 같은 그룹 내에서 다같이 Todo 리스트를 관리하고 채팅을 할 수 있는 웹 서비스

### 주요 기능
* 로그인
* 방 생성 및 초대 코드 생성
* 초대 코드 입력 후 방 입장 (로그아웃 해도 입장했던 방 유지)
* 실시간으로 채팅, 공동 Todo List 관리
	* Todo 생성, 수정, 삭제
	* 현재 접속된 해당 방 유저 간 채팅
	* 방을 생성한 방장은 해당 방 삭제 가능
	* 방에 입장한 유저들은 방 나가기 가능

### 기술 스택
* Spring Boot
* React
* mySQL
* AWS EC2
* AWS RDS
* WebSocket (STOMP)
* HTTP Session 로그인 관리

### 주요 제작 내용
* Restful API 제작 및 웹소켓 관련 로직 구현
* React + Spring 빌드 후 AWS EC2 배포
* AWS RDS에 mySQL 설치 후 연동
* 포트포워딩 및 방화벽 설정

![3FE99352-AD02-44F6-9BE4-B810BDC2A9E3](https://user-images.githubusercontent.com/93072571/190405000-7e900c40-c6c4-4223-a314-d4ff3ff26fc0.png)

![0DB8EFC6-D575-4B11-BFCF-77780F5EF2AE](https://user-images.githubusercontent.com/93072571/190405030-821c51d3-2c15-47ea-bb08-803d1fc39289.png)
