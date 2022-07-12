import { getAllSuggestions, getSuggestion, insertSuggestion, updateSuggestion, insertLike, deleteLike, selectSuggestionExistence } from "../models/Suggestion.js";

//전체 건의 게시글 조회
const getSuggestions = async (userId) => {
    let allSuggestions = await getAllSuggestions(userId);
    
    if(allSuggestions.length == 0){
        allSuggestions = '데이터가 존재하지 않습니다.'
    }

    return allSuggestions;
}

//특정 건의 게시글 존재 확인
const getSuggestionBoard = async (userId, suggestionId) => {
    const suggestionBoard = await getSuggestion(userId, suggestionId);
    return suggestionBoard;
}

//특정 건의 게시글 조회
const checkSuggestionExistence = async (suggestionId) => {
    const Existence = await selectSuggestionExistence(suggestionId);
    return Existence;
}

//건의 게시글 작성
const insertSuggestionBoard = async (userId, inputSuggestion) => {
    const addedsuggestionBoard = await insertSuggestion(userId, inputSuggestion);   
    return addedsuggestionBoard;
}

//건의 게시글 수정
const updateSuggestionBoard = async (userId, suggestionId, updatedSuggestion) => {
    const updatedsuggestionBoard = await updateSuggestion(userId, suggestionId, updatedSuggestion);   
    return updatedsuggestionBoard;
}

//좋아요 선택
const insertSuggestionLike = async (suggestionId, userId) => {
    const addedLikeId = await insertLike(suggestionId, userId);
    return addedLikeId;
}

//좋아요 취소
const deleteSuggestionLike = async (suggestionId, userId) => {
    const canceledLike = await deleteLike(suggestionId, userId);
    return canceledLike;
}

export { getSuggestions, getSuggestionBoard, insertSuggestionBoard, updateSuggestionBoard, insertSuggestionLike, deleteSuggestionLike, checkSuggestionExistence };