package com.exam.controller;

import com.exam.entity.InterviewRoom;
import com.exam.service.InterviewRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/interview-room")
@CrossOrigin(origins = "*")
public class InterviewRoomController {

    @Autowired
    private InterviewRoomService interviewRoomService;

    // 新增面试房间
    @PostMapping
    public void createInterviewRoom(@RequestBody InterviewRoom interviewRoom) {
        interviewRoomService.createInterviewRoom(interviewRoom);
    }

    // 根据ID查询面试房间
    @GetMapping("/{id}")
    public InterviewRoom getInterviewRoomById(@PathVariable Long id) {
        return interviewRoomService.getInterviewRoomById(id);
    }

    // 查询所有面试房间
    @GetMapping
    public List<InterviewRoom> getAllInterviewRooms() {
        return interviewRoomService.getAllInterviewRooms();
    }

    // 更新面试房间
    @PutMapping
    public void updateInterviewRoom(@RequestBody InterviewRoom interviewRoom) {
        interviewRoomService.updateInterviewRoom(interviewRoom);
    }

    // 删除面试房间
    @DeleteMapping("/{id}")
    public void deleteInterviewRoom(@PathVariable Long id) {
        interviewRoomService.deleteInterviewRoom(id);
    }
    // 开始面试接口
    @GetMapping("/startInterview")
    public String startInterview(@RequestParam Long id) {
        return interviewRoomService.startInterview(id);
    }

    // 结束面试接口
    @PostMapping("/endInterview")
    public String endInterview(@RequestParam("id") Long id) {
        return interviewRoomService.endInterview(id);
    }

}
