package com.exam.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class InterviewAppointment {
    private Long id;

    private String candidateName;  // 考生姓名

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date appointmentTime;  // 预约时间

    private String examinerName;   // 考官姓名

    private String status;         // 状态，例如：已预约、已完成、已取消
}
