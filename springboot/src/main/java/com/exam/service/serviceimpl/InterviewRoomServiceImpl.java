package com.exam.service.serviceimpl;

import com.exam.entity.InterviewRoom;
import com.exam.mapper.InterviewRoomMapper;
import com.exam.service.InterviewRoomService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class InterviewRoomServiceImpl implements InterviewRoomService {

    @Resource
    private InterviewRoomMapper interviewRoomMapper;

    @Override
    public void createInterviewRoom(InterviewRoom interviewRoom) {
        interviewRoomMapper.insertInterviewRoom(interviewRoom);
    }

    @Override
    public InterviewRoom getInterviewRoomById(Long id) {
        return interviewRoomMapper.getInterviewRoomById(id);
    }

    @Override
    public List<InterviewRoom> getAllInterviewRooms() {
        return interviewRoomMapper.getAllInterviewRooms();
    }

    @Override
    public void updateInterviewRoom(InterviewRoom interviewRoom) {
        interviewRoomMapper.updateInterviewRoom(interviewRoom);
    }

    @Override
    public void deleteInterviewRoom(Long id) {
        interviewRoomMapper.deleteInterviewRoom(id);
    }
}
