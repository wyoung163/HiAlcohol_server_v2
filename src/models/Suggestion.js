import { db } from "../../config/db.js";

//전체 건의 게시글 조회
async function getAllSuggestions() {
    const getAllSuggestionsQuery = `
        select s.id, u.nickname, s.title, s.content, s.createdate
        from suggestion as s
        join user as u on s.userId = u.id
    `;
    const [allSuggestions] = await db.query(getAllSuggestionsQuery);
    return allSuggestions;
}

//특정 건의 게시글 조회
async function getSuggestion(suggestionId) {
    const getSuggestionQuery = `
        select s.id, u.nickname, s.title, s.content, s.createdate
        from suggestion as s
        join user as u on s.userId = u.id
        where s.id = ?
    `;
    const [suggestion] = await db.query(getSuggestionQuery, [suggestionId]);
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
    if(isUser.userId != userId){
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

export {
    getAllSuggestions, 
    getSuggestion,
    insertSuggestion,
    updateSuggestion
};