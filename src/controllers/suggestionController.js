import { getSuggestions, getSuggestionBoard, insertSuggestionBoard, updateSuggestionBoard } from "../services/suggestionService.js";
import { response, errResponse } from "../../config/response.js";

//전체 건의 게시글 조회
const showSuggestions = async (req, res) => {
    try {
        const suggestions = await getSuggestions();

        return res.send(response({"code":200, "message": '건의 게시판 접근에 성공하였습니다.'}, suggestions));
    } catch(err) {
        console.log(err);
        return res.send(errResponse({"code": 400, "message": '건의 게시판 접근에 실패하였습니다.'}));
    }
}

//특정 건의 게시글 조회
const showSuggestionBoard = async (req, res) => {
    try {
        const suggestionId = req.params.id;
        const suggestionBoard = await getSuggestionBoard(suggestionId);

        return res.send(response({ "code": 200, "message": '건의 게시글 조회에 성공하였습니다.' }, suggestionBoard));
    } catch (err) {
        console.log(err);
        return res.send(errResponse({ "code": 400, "message": '건의 게시글 조회에 실패하였습니다.' }));
    }
}

//건의 게시글 작성
const addSuggestionBoard = async (req, res) => {
    try {
        // const userId = req.session.id;
        // const userId = req.body.userId;
        const inputSuggestion = req.body;
        
        const addedSuggestionBoard = await insertSuggestionBoard(userId, inputSuggestion); 
        return res.send(response({ "code": 200, "message": '건의 게시글 작성에 성공하였습니다.' }, addedSuggestionBoard));    
    } catch (err) {
        console.log(err);
        return res.send(errResponse({ "code": 400, "message": '건의 게시글 작성에 실패하였습니다.' }));
    }
}

//건의 게시글 수정
const editSuggestionBoard = async (req, res) => {
    try {
        // const userId = req.session.id;
        // const userId = req.body.userId;
        const suggestionId = req.params.id;
        const updatedSuggestion = req.body;

        const updatedSuggestionBoard = await updateSuggestionBoard(suggestionId, updatedSuggestion); 
        return res.send(response({ "code": 200, "message": '건의 게시글 수정에 성공하였습니다.' }, updatedSuggestionBoard));
    } catch (err) {
        console.log(err);
        return res.send(errResponse({ "code": 400, "message": '건의 게시글 수정에 실패하였습니다.' }));
    }
}

export { showSuggestions, showSuggestionBoard, addSuggestionBoard, editSuggestionBoard };