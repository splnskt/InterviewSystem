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

    @Override
    public String startInterview(Long id) {
        // 获取面试房间信息
        InterviewRoom interviewRoom = interviewRoomMapper.getInterviewRoomById(id);
        if (interviewRoom == null) {
            throw new IllegalArgumentException("面试房间不存在");
        }
        // 确认面试房间状态
        if (!"准备中".equals(interviewRoom.getStatus())) {
            throw new IllegalArgumentException("面试房间当前状态不可启动，请确认状态是否为‘准备中’");
        }

        // 更新面试状态为“进行中”
        interviewRoom.setStatus("进行中");
        interviewRoomMapper.updateInterviewRoom(interviewRoom);

        // 返回前端视频通话页面的 URL
        String peerId = interviewRoom.getPeerId();
        return "/video-call?peerId=" + peerId + "&candidateName=" + interviewRoom.getCandidateName() +
                "&examinerName=" + interviewRoom.getExaminerName();
    }

    @Override
    public String endInterview(Long id) {
        // 获取面试房间信息
        InterviewRoom interviewRoom = interviewRoomMapper.getInterviewRoomById(id);
        if (interviewRoom == null) {
            throw new IllegalArgumentException("面试房间未找到，请检查ID是否正确。");
        }

        // 确认面试房间状态是否为“进行中”
        if (!"进行中".equals(interviewRoom.getStatus())) {
            throw new IllegalArgumentException("面试房间当前状态不允许结束，请确认面试正在进行中。");
        }

        // 更新面试状态为“已结束”
        interviewRoom.setStatus("已结束");
        interviewRoomMapper.updateInterviewRoom(interviewRoom);

        return "面试已结束，房间 ID：" + id;
    }


}
