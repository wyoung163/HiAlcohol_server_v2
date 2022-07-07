import { 
    selectBoardReports, 
    selectCommentReports, 
    insertReportedComment, 
    insertReportedBoard, 
    checkCommentExistence, 
    checkBoardExistence 
} from "../models/Report.js";

//신고된 게시글 모아보기
const selectreportedBoards = async () => {
    const reportedBoards = await selectBoardReports();
    return reportedBoards;
}

//신고된 댓글의 게시글 모아보기
const selectreportedComments = async () => {
    const reportedComments = await selectCommentReports();
    return reportedComments;
}

//댓글 신고
const insertCommentReport = async (postId, commentId, userId) => {
    const reportedComment = await insertReportedComment(postId, commentId, userId);
    return reportedComment;
}

//게시글 신고
const insertBoardReport = async (postId, userId) => {
    const reportedBoard = await insertReportedBoard(postId, userId);
    return reportedBoard;
}

const checkCommentDuplication = async (postId, commentId, userId) => {
    const duplication = await checkCommentExistence(postId, commentId, userId);
    return duplication;
}

const checkBoardDuplication = async (postId, userId) => {
    const duplication = await checkBoardExistence(postId, userId);
    return duplication;
}


export { 
    selectreportedBoards, 
    selectreportedComments, 
    insertCommentReport,
    insertBoardReport, 
    checkCommentDuplication, 
    checkBoardDuplication 
};
