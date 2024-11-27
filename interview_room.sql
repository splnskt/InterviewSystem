/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80400 (8.4.0)
 Source Host           : localhost:3306
 Source Schema         : exam

 Target Server Type    : MySQL
 Target Server Version : 80400 (8.4.0)
 File Encoding         : 65001

 Date: 27/11/2024 17:27:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for interview_room
-- ----------------------------
DROP TABLE IF EXISTS `interview_room`;
CREATE TABLE `interview_room`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `peer_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `candidate_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '考生姓名',
  `examiner_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '考官姓名',
  `start_time` datetime NULL DEFAULT NULL COMMENT '面试开始时间',
  `end_time` datetime NULL DEFAULT NULL COMMENT '面试结束时间',
  `status` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '面试状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = '面试房间表' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
