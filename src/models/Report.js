import { db } from "../../config/db.js";

//게시글 신고 횟수 계산하기
const countBoardQuery = `
    select count(*) as count from report_post
    where postId = ?;
`;

//댓글 신고 횟수 계산하기
const countCommentQuery = `
    select count(*) as count from report_comment
    where postId = ? and commentId = ?;
`;

//댓글 숨김 처리 관리
const updateBlindCommentQuery = `
    update comment 
    set blind = ?
    where postId =  ? and id = ?; 
`;

//게시글 숨김 처리 관리
const updateBlindBoardQuery = `
    update post
    set blind = ?
    where id =  ?; 
`;

//신고된 게시글
async function selectBoardReports() {
    var count = [];
    var reportedBoardsInfo = [];

    //신고된 게시글 아이디 중복 제거해서 받아오기
    const selectBoardReportsQuery = `
        select DISTINCT postId from report_post
        group by postId order by count(*) desc;
    `;
    const [reportedBoards] = await db.query(selectBoardReportsQuery);

    for(var i = 0; i < reportedBoards.length; i++){
        let [num] = await db.query(countBoardQuery, [reportedBoards[i].postId]);
        count.push(num);
    }

    //각 신고된 게시글의 정보 받아오기
    const boardsInfoQuery =`
        select p.id, u.nickname, p.title, p.content, p.createdate, p.blind
        from post as p
        join user as u on p.userId = u.id
        where p.id = ?;
    `;
    for(var i = 0; i < reportedBoards.length; i++){
        let [Info] = await db.query(boardsInfoQuery, [reportedBoards[i].postId]);
        reportedBoardsInfo.push(Info[0]);
    }    

    for(var i = 0; i < reportedBoards.length; i++){
        Object.assign(reportedBoardsInfo[i], count[i][0]);
    }

    return reportedBoardsInfo;
}

//신고된 댓글의 게시글
async function selectCommentReports() {
    var count = [];
    var reportedCommentsInfo = [];

    //신고된 게시글+댓글 정보 중복 없이 받아오기
    const selectCommentReportsQuery = `
        select DISTINCT postId, commentId from report_comment
        group by postId, commentId order by count(*) desc;
    `;
    const [reportedComments] = await db.query(selectCommentReportsQuery);
    console.log(reportedComments);

    for(var i = 0; i < reportedComments.length; i++){
        let [num] = await db.query(countCommentQuery, [reportedComments[i].postId, reportedComments[i].commentId]);
        count.push(num);
    }

    //신고된 댓글 정보와 해당 게시글 정보 받아오기
    const commentBoardInfoQuery =`
        select p.id, u.nickname, p.title, p.content, p.createdate, p.blind
        from post as p
        join user as u on p.userId = u.id
        where p.id = ?;
    `;
    const commentsInfoQuery =`
        select c.id, u.nickname, c.content, c.createdate, c.blind
        from comment as c
        join user as u on c.userId = u.id
        where c.id = ? and c.postId = ?;
    `;
    for(var i = 0; i < reportedComments.length; i++){
        let [Info1] = await db.query(commentBoardInfoQuery, [reportedComments[i].postId]);
        let [Info2] = await db.query(commentsInfoQuery, [reportedComments[i].commentId, reportedComments[i].postId]);
        reportedCommentsInfo.push({"post": Info1[0], "comment": Info2[0]});
    }

    //신고 횟수 결과에 추가
    for(var i = 0; i < reportedComments.length; i++){
        Object.assign(reportedCommentsInfo[i], count[i][0]);
    }

    return reportedCommentsInfo;

}

//댓글 신고
async function insertReportedComment(postId, commentId, userId) {
    let isBlind = '';
    const insertReportedCommentQuery = `
        insert into report_comment(postId, commentId, userId, createdate)
        values(?, ?, ?, now())
    `;
    const [suggestion] = await db.query(insertReportedCommentQuery, [postId, commentId, userId]);
    const [count] = await db.query(countCommentQuery, [postId, commentId]);

    if(count[0].count >= 10){
        await db.query(updateBlindCommentQuery, [1, postId, commentId]);
        isBlind = true;
        return Object.assign(count[0], {"reportId" : suggestion.insertId, "postId" : postId, "commentId": commentId, "isBlind": isBlind});
    }

    return Object.assign(count[0], {"reportId" : suggestion.insertId, "postId" : postId, "commentId": commentId});
}

//게시글 신고 
async function insertReportedBoard(postId, userId) {
    let isBlind = '';
    const insertReportedBoardQuery = `
        insert into report_post(postId, userId, createdate)
        values(?, ?, now())
    `;

    const [suggestion] = await db.query(insertReportedBoardQuery, [postId, userId]);
    const [count] = await db.query(countBoardQuery, [postId]);

    console.log(count[0].count);

    if(count[0].count >= 10){
        await db.query(updateBlindBoardQuery, [1, postId]);
        isBlind = true;
        return Object.assign(count[0], {"reportId" : suggestion.insertId, "postId" : postId, "isBlind": isBlind});
    }

    return Object.assign(count[0], {"reportId" : suggestion.insertId, "postId" : postId});
}

//중복 댓글 신고 확인
async function checkCommentExistence(postId, commentId, userId) {
    const checkCommentExistenceQuery = `
        select * from report_comment
        where postId = ? and commentId =  ? and userId = ? 
    `;

    const [duplication] = await db.query(checkCommentExistenceQuery, [postId, commentId, userId]);
    return duplication;
}

//중복 게시글 신고 확인
async function checkBoardExistence(postId, userId) {
    const checkBoardExistenceQuery = `
        select * from report_post
        where postId =  ? and userId = ? 
    `;
    
    const [duplication] = await db.query(checkBoardExistenceQuery, [postId, userId]);
    return duplication;
}

//댓글 숨김 처리 관리
async function updateBlindComment(postId, commentId) {
    let isBlind = '';
    const checkBlindQuery = `
        select blind 
        from comment
        where postId = ? and id = ?
    `;
    const [blind] = await db.query(checkBlindQuery, [postId, commentId]);

    if(blind[0].blind == 0) {
        await db.query(updateBlindCommentQuery, [1, postId, commentId]);
        return isBlind = {"isBlind": true};
    } else {
        await db.query(updateBlindCommentQuery, [0, postId, commentId]);
        return isBlind = {"isBlind": false};
    }
}

//게시글 숨김 처리 관리
async function updateBlindBoard(postId) {
    let isBlind = '';
    const checkBlindQuery = `
        select blind 
        from post
        where id = ?;
    `;
    const [blind] = await db.query(checkBlindQuery, [postId]);

    if(blind[0].blind == 0) {
        await db.query(updateBlindBoardQuery, [1, postId]);
        return isBlind = {"isBlind": true};
    } else {
        await db.query(updateBlindBoardQuery, [0, postId]);
        return isBlind = {"isBlind": false};
    }
}

export {
    selectBoardReports, 
    selectCommentReports, 
    insertReportedComment, 
    insertReportedBoard,
    checkCommentExistence,
    checkBoardExistence,
    updateBlindComment,
    updateBlindBoard
};