import { insertReportedComment, insertReportedBoard, checkExistence } from "../models/Report.js";

//댓글 신고
const insertCommentReport = async (commentId, userId) => {
    let reportedComment = await insertReportedComment(commentId, userId);
    return reportedComment;
}

//게시글 신고
const insertBoardReport = async (postId, userId) => {
    const reportedBoard = await insertReportedBoard(postId, userId);
    return reportedBoard;
}

const checkDuplication = async (id, userId, type) => {
    const duplication = await checkExistence(id, userId, type);
    return duplication;
}

export { insertCommentReport, insertBoardReport, checkDuplication };