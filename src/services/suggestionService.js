import { getAllSuggestions, getSuggestion, insertSuggestion, updateSuggestion } from "../models/Suggestion.js";

//전체 건의 게시글 조회
const getSuggestions = async () => {
    let allSuggestions = await getAllSuggestions();
    
    if(allSuggestions.length == 0){
        allSuggestions = '데이터가 존재하지 않습니다.'
    }

    return allSuggestions;
}

//특정 건의 게시글 조회
const getSuggestionBoard = async (suggestionId) => {
    const suggestionBoard = await getSuggestion(suggestionId);
    return suggestionBoard;
}

//건의 게시글 작성
const insertSuggestionBoard = async (userId, inputSuggestion) => {
    const addedsuggestionBoard = await insertSuggestion(userId, inputSuggestion);   
    return addedsuggestionBoard;
}

//건의 게시글 수정
const updateSuggestionBoard = async (suggestionId, updatedSuggestion) => {
    const updatedsuggestionBoard = await updateSuggestion(suggestionId, updatedSuggestion);   
    return updatedsuggestionBoard;
}

export { getSuggestions, getSuggestionBoard, insertSuggestionBoard, updateSuggestionBoard };