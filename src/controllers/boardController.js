import { BoardService } from "../services/boardService.js";

const boardController = {
  // 글 작성
  createPost: async (req, res, next) => {
    try {
      const userId = 1;
      const title = req.body.title;
      const content = req.body.content;
      const images = req.files?.images ?? null;
      const data = await BoardService.create({ userId, title, content, images });
  
      const body = {
        code: 201,
        message: "글 작성에 성공하였습니다.",
        data,
      };

      res.status(201).send(body);
    } catch (err) {
      next(err);
    }
  },
  
  // 게시글 전체 조회
  getPostList: async (req, res, next) => {
    try { 
      const id = req.currentUserId;
      const data = await BoardService.getUserInfo({ id });

      if (!data) { 
        const body = {
          code: 404,
          message: "존재하지 않는 유저입니다.",
        };

        return res.status(404).send(body);
      }

      const body = {
        code: 200,
        message: "회원 정보 조회에 성공하였습니다.",
        data,
      };

      return res.status(200).send(body);
    } catch (err) {
      next(err);
    }
  },

  // 게시글 하나

  // 게시글 하나 읽기
  getPost: async (req, res, next) => {
    try {
      const postId = req.params.id;
      
      const date = BoardService.findPost({ postId });

      const body = {
        code: 200,
        message: "글 조회에 성공하였습니다.",
        data,
      };

      return res.status(200).send(body);
    } catch (err) {

    }
  },

  editPost: async (req, res, next) => { 
    try { 
      const profile_image = req.file.profile_image;
      const nickname = req.body.nickname;

      const toUpdate = {
        profile_image,
        nickname,
      };

      Object.keys(toUpdate).forEach((key) => {
        if (toUpdate[key] === undefined || toUpdate[key] === null) {
          delete toUpdate[key];
        }
      });

      const data = await BoardService.editUserInfo({ id, toUpdate });

      if (!data) { 
        const body = {
          code: 404,
          message: "존재하지 않는 유저입니다.",
        };

        return res.status(404).send(body);
      }

      const body = {
        code: 200,
        message: "회원 정보 수정에 성공하였습니다.",
        data,
      };

      return res.status(200).send(body);
    } catch (err) {
      next(err);
    }
  },
};


export { boardController };