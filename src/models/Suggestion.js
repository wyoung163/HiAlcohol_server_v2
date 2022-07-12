import { db } from "../../config/db.js";

//전체 건의 게시글 조회
async function getAllSuggestions(userId) {
    const getAllSuggestionsQuery = `
        select suggestion.*, count(suggestion_liked.id) 'count' from 
        (select suggestion.id 'suggestionId', user.nickname, suggestion.title, suggestion.createdate, from suggestion, user where suggestion.userId=user.id) suggestion 
        left join suggestion_liked on suggestion.suggestionId=suggestion_liked.suggestionId group by suggestion.suggestionId order by suggestion.createdate desc;
    `;

    const likeCheckQuery = `
        select userId from suggestion_liked
        where userId = ? and suggestionId = ?;
    `;

    const [allSuggestions] = await db.query(getAllSuggestionsQuery);

    if (userId != null) {
        for (var i = 0; i < allSuggestions.length; i++) {
            const [likeCheck] = await db.query(likeCheckQuery, [userId, allSuggestions[i].suggestionId]);
            console.log(likeCheck.length);
            if (likeCheck.length > 0) {
                Object.assign(allSuggestions[i], { "likeSelection": true });
            } else {
                Object.assign(allSuggestions[i], { "likeSelection": false });
            }
        }
    }

    return allSuggestions;
}


async function selectSuggestionExistence(suggestionId) {
    const selectSuggestionExistenceQuery = `
        select id 
        from suggestion
        where id = ?
    `;
    const Existence = await db.query(selectSuggestionExistenceQuery, [suggestionId]);
    return Existence;
}


//특정 건의 게시글 조회
async function getSuggestion(userId, suggestionId) {
    const getSuggestionQuery = `
        select s.id, u.nickname, s.title, s.content, s.createdate
        from suggestion as s
        join user as u on s.userId = u.id
        where s.id = ?;
    `;

    const likeCountQuery = `
        select count(*) as like_count from suggestion_liked
        where suggestionId = ?;
    `;

    const likeCheckQuery = `
        select userId from suggestion_liked
        where userId = ? and suggestionId = ?;
    `;

    const [suggestion] = await db.query(getSuggestionQuery, [suggestionId]);
    const [likeCount] = await db.query(likeCountQuery, [suggestionId]);
    Object.assign(suggestion[0], likeCount[0]);

    if (userId != null) {
        const [likeCheck] = await db.query(likeCheckQuery, [userId, suggestionId]);
        if (likeCheck.length > 0) {
            Object.assign(suggestion[0], { "likeSelection": true });
        } else {
            Object.assign(suggestion[0], { "likeSelection": false });
        }
    }

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
    if (isUser.userId != userId) {
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

//좋아요 선택
async function insertLike(suggestionId, userId) {
    const insertLikeQuery = `
        insert into suggestion_liked(suggestionId, userId)
        values(?, ?)
    `;
    const [addedLike] = await db.query(insertLikeQuery, [suggestionId, userId]);
    const addedLikeId = addedLike.insertId;
    return addedLikeId;
}

//좋아요 취소
async function deleteLike(suggestionId, userId) {
    const deleteLikeQuery = `
        delete from suggestion_liked 
        where suggestionId =? and userId = ?
    `;
    const [canceledLike] = await db.query(deleteLikeQuery, [suggestionId, userId]);
    return canceledLike;
}


export {
    getAllSuggestions,
    getSuggestion,
    insertSuggestion,
    updateSuggestion,
    insertLike,
    deleteLike,
    selectSuggestionExistence
};