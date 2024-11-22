package com.exam.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class InterviewRoom {
    private Long id;

    private String peerId;         // WebSocket标识

    private String candidateName;  // 考生姓名

    private String examinerName;   // 考官姓名

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date startTime;        // 面试开始时间

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date endTime;          // 面试结束时间

    private String status;         // 面试状态，例如：准备中、进行中、已结束
}
