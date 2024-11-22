package com.exam.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class InterviewLog {
    private Long id;

    private Long roomId;           // 面试房间ID

    private String message;        // 日志内容

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date timestamp;        // 日志时间戳
}
