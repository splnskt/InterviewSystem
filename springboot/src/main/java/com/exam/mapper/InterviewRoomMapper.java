package com.exam.mapper;

import com.exam.entity.InterviewRoom;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface InterviewRoomMapper {

    /**
     * 新增面试房间
     *
     * @param interviewRoom 面试房间对象
     * @return 插入成功的记录数
     */
    @Insert("INSERT INTO interview_room (peer_id, candidate_name, examiner_name, start_time, end_time, status) " +
            "VALUES (#{peerId}, #{candidateName}, #{examinerName}, #{startTime}, #{endTime}, #{status})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    int insertInterviewRoom(InterviewRoom interviewRoom);

    /**
     * 根据ID查询面试房间
     *
     * @param id 面试房间ID
     * @return 面试房间对象
     */
    @Select("SELECT * FROM interview_room WHERE id = #{id}")
    InterviewRoom getInterviewRoomById(Long id);

    /**
     * 查询所有面试房间
     *
     * @return 面试房间列表
     */
    @Select("SELECT * FROM interview_room")
    List<InterviewRoom> getAllInterviewRooms();

    /**
     * 更新面试房间
     *
     * @param interviewRoom 面试房间对象
     * @return 更新成功的记录数
     */
    @Update("UPDATE interview_room SET " +
            "peer_id = #{peerId}, " +
            "candidate_name = #{candidateName}, " +
            "examiner_name = #{examinerName}, " +
            "start_time = #{startTime}, " +
            "end_time = #{endTime}, " +
            "status = #{status} " +
            "WHERE id = #{id}")
    int updateInterviewRoom(InterviewRoom interviewRoom);

    /**
     * 根据ID删除面试房间
     *
     * @param id 面试房间ID
     * @return 删除成功的记录数
     */
    @Delete("DELETE FROM interview_room WHERE id = #{id}")
    int deleteInterviewRoom(Long id);


}
