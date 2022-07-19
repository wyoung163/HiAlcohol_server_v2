import { 
    getAllSuggestions,
    getAllSuggestionsForAdmin,
    getSuggestion,
    getSuggestionForAdmin,
    insertSuggestion,
    updateSuggestion,
    selectSuggestionExistence
 } from "../models/Suggestion.js";

//전체 건의 게시글 조회
const getSuggestions = async (userId, option) => {
    let allSuggestions = await getAllSuggestions(userId, option);
    
    if(allSuggestions.length == 0){
        allSuggestions = '데이터가 존재하지 않습니다.'
    }

    return allSuggestions;
}

//<관리자> 전체 건의 게시글 조회
const getSuggestionsForAdmin = async (option) => {
    let allSuggestions = await getAllSuggestionsForAdmin(option);
    
    if(allSuggestions.length == 0){
        allSuggestions = '데이터가 존재하지 않습니다.'
    }

    return allSuggestions;
}

//특정 건의 게시글 존재 확인
const checkSuggestionExistence = async (suggestionId) => {
    const Existence = await selectSuggestionExistence(suggestionId);
    return Existence;
}

//특정 건의 게시글 조회
const getSuggestionBoard = async (userId, suggestionId) => {
    const suggestionBoard = await getSuggestion(userId, suggestionId);
    return suggestionBoard;
}

//<관리자> 특정 건의 게시글 조회
const getSuggestionBoardForAdmin = async (suggestionId) => {
    const suggestionBoard = await getSuggestionForAdmin(suggestionId);
    return suggestionBoard;
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

export { 
    getSuggestions, 
    getSuggestionsForAdmin,
    checkSuggestionExistence,
    getSuggestionBoard, 
    getSuggestionBoardForAdmin,
    insertSuggestionBoard, 
    updateSuggestionBoard, 
};