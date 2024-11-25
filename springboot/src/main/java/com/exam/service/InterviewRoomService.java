package com.exam.service;

import com.exam.entity.InterviewRoom;

import java.util.List;

public interface InterviewRoomService {
    // 新增面试房间
    void createInterviewRoom(InterviewRoom interviewRoom);

    // 根据ID查询面试房间
    InterviewRoom getInterviewRoomById(Long id);

    // 查询所有面试房间
    List<InterviewRoom> getAllInterviewRooms();

    // 更新面试房间
    void updateInterviewRoom(InterviewRoom interviewRoom);

    // 删除面试房间
    void deleteInterviewRoom(Long id);

    // 开始面试
    String startInterview(Long id);

    // 结束面试
    String endInterview(Long id);

}
