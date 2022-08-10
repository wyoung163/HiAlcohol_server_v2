import { db } from "../../config/db.js";

//전체 게시글 '최신순' 조회 Query 
const getAllSuggestionsQuery1 = `
    select suggestion.*, count(suggestion_liked.id) 'count' from 
    (select suggestion.id 'suggestionId', user.nickname, suggestion.title, suggestion.createdate from suggestion, user where suggestion.userId=user.id) suggestion 
    left join suggestion_liked on suggestion.suggestionId=suggestion_liked.suggestionId group by suggestion.suggestionId order by suggestion.createdate desc;
`;

//전체 게시글 '좋아요순' 조회 Query 
const getAllSuggestionsQuery2 = `
    select suggestion.*, count(suggestion_liked.id) 'count' from 
    (select suggestion.id 'suggestionId', user.nickname, suggestion.title, suggestion.createdate from suggestion, user where suggestion.userId=user.id) suggestion 
    left join suggestion_liked on suggestion.suggestionId=suggestion_liked.suggestionId group by suggestion.suggestionId order by suggestion_liked.id desc;
`;

//로그인한 회원의 좋아요 여부 조회 Query
const likeCheckQuery = `
    select userId from suggestion_liked
    where userId = ? and suggestionId = ?;
`;

//게시글(정보) 조회 Query
const getSuggestionQuery = `
    select s.id, u.nickname, s.title, s.content, s.createdate
    from suggestion as s
    join user as u on s.userId = u.id
    where s.id = ?;
`;

//좋아요 갯수 확인 Query
const likeCountQuery = `
    select count(*) as like_count from suggestion_liked
    where suggestionId = ?;
`;

//전체 건의 게시글 조회
async function getAllSuggestions(userId, option) {
    let allSuggestions = '';
    if(option == 'latest') {
        [allSuggestions] = await db.query(getAllSuggestionsQuery1);
    } else {
        [allSuggestions] = await db.query(getAllSuggestionsQuery2);
    } 

    if (userId !== null) {
        for (var i = 0; i < allSuggestions.length; i++) {
            const [likeCheck] = await db.query(likeCheckQuery, [userId, allSuggestions[i].suggestionId]);
            if (likeCheck.length > 0) {
                Object.assign(allSuggestions[i], { "likeSelection": true });
            } else {
                Object.assign(allSuggestions[i], { "likeSelection": false });
            }
        }
    } 

    return allSuggestions;
}

//<관리자> 전체 건의 게시글 조회
async function getAllSuggestionsForAdmin(option) {
    let allSuggestions = '';
    if(option == 'latest') {
        [allSuggestions] = await db.query(getAllSuggestionsQuery1);
    } else {
        [allSuggestions] = await db.query(getAllSuggestionsQuery2);
    }
    return allSuggestions;
}

//게시글 존재 확인
async function selectSuggestionExistence(suggestionId) {
    const selectSuggestionExistenceQuery = `
        select id 
        from suggestion
        where id = ?;
    `;
    const Existence = await db.query(selectSuggestionExistenceQuery, [suggestionId]);
    return Existence;
}

//특정 건의 게시글 조회
async function getSuggestion(userId, suggestionId) {
    const [suggestion] = await db.query(getSuggestionQuery, [suggestionId]);
    const [likeCount] = await db.query(likeCountQuery, [suggestionId]);
    Object.assign(suggestion[0], likeCount[0]);

    if (userId !== null) {
        const [likeCheck] = await db.query(likeCheckQuery, [userId, suggestionId]);
        if (likeCheck.length > 0) {
            Object.assign(suggestion[0], { "likeSelection": true });
        } else {
            Object.assign(suggestion[0], { "likeSelection": false });
        }
    }

    return suggestion;
}

//<관리자> 특정 건의 게시글 조회
async function getSuggestionForAdmin(suggestionId) {
    const [suggestion] = await db.query(getSuggestionQuery, [suggestionId]);
    const [likeCount] = await db.query(likeCountQuery, [suggestionId]);
    Object.assign(suggestion[0], likeCount[0]);
    return suggestion;
}

//건의 게시글 작성
async function insertSuggestion(userId, inputSuggestion) {
    const insertSuggestionQuery = `
        insert into suggestion(userId, title, content, createdate) 
        values(?, ?, ?, now())
    `;
    const suggestion = await db.query(insertSuggestionQuery, [userId, inputSuggestion.title, inputSuggestion.content]);
    const addedSuggestionId = suggestion[0].insertId;

    const getaddedSuggestionQuery = `
        select s.id, u.nickname, s.title, s.content, s.createdate
        from suggestion as s
        join user as u on s.userId = u.id
        where s.id = ?
    `;
    const [addedsuggestion] = await db.query(getaddedSuggestionQuery, [addedSuggestionId]);
    return addedsuggestion;
}

//건의 게시글 수정
async function updateSuggestion(userId, suggestionId, updatedSuggestion) {
    const checkUserQuery = `
        select userId from suggestion
        where id = ?    
    `;
    const isUser = await db.query(checkUserQuery, [suggestionId]);
    if (isUser[0][0].userId != userId) {
        return;
    }

    const updateSuggestionQuery = `
        update suggestion set title = ?, content = ?, updatedate = now()
        where id = ?    
    `;
    await db.query(updateSuggestionQuery, [updatedSuggestion.title, updatedSuggestion.content, suggestionId]);

    const getupdatedSuggestionQuery = `
        select s.id, u.nickname, s.title, s.content, s.createdate, s.updatedate
        from suggestion as s
        join user as u on s.userId = u.id
        where s.id = ?
    `;
    const [updatedsuggestion] = await db.query(getupdatedSuggestionQuery, [suggestionId]);
    return updatedsuggestion;
}

//건의 게시글 삭제
async function deleteSuggestion(userId, suggestionId) {
    const checkUserQuery = `
        select userId from suggestion
        where id = ?    
    `;
    const isUser = await db.query(checkUserQuery, [suggestionId]);
    if (isUser[0][0].userId != userId) {
        return;
    }

    const deleteSuggestionQuery = `
        delete from suggestion
        where id = ?    
    `;
    await db.query(deleteSuggestionQuery, [suggestionId]);

    const deletedsuggestion = suggestionId;
    return deletedsuggestion;
}

export {
    getAllSuggestions,
    getAllSuggestionsForAdmin,
    getSuggestion,
    getSuggestionForAdmin,
    insertSuggestion,
    updateSuggestion,
    selectSuggestionExistence,
    deleteSuggestion
};