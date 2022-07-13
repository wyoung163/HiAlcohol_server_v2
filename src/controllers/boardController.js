import { BoardService } from "../services/boardService.js";
import { multer } from 'multer';

const boardController = {
  /********** 게시글 **********/

  // 글 작성
  createPost: async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const title = req.body.title;
      const content = req.body.content;
      const files = req.files;
      let images = files.map((v) => v.location);
      // 배열을 저장하기 위해 문자열로 변환
      // 이미지가 없다면 null로
      images = images.length === 0 ? null : JSON.stringify(images);

      const data = await BoardService.create({ userId, title, content, images });
      console.log(data);
      // 문자열을 배열로 변환
      data.images = JSON.parse(data.images);
      
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

  // 게시글 이미지 첨부
  createPostImages: async (req, res, next) => {
    try {
      const id = req.params.id;
      const files = req.files;
      
      // 이미지가 없다면 바로 글 작성 성공시키기
      if (files === undefined) {
        const data = await BoardService.findPost({ postId: id });
        
        data.images = JSON.parse(data.images);
        const body = {
          code: 201,
          message: "글 작성에 성공하였습니다.",
          data,
        };

        return res.status(201).send(body);
      }

      let images = files.map((v) => v.location);
      // 배열을 저장하기 위해 문자열로 변환
      images = JSON.stringify(images);

      const data = await BoardService.createImages({ id, images });
      // 문자열을 배열로 변환
      data.images = JSON.parse(data.images);

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
      let data = await BoardService.findPostList();

      const body = {
        code: 200,
        message: "게시판 조회에 성공하였습니다.",
        data,
      };

      return res.status(200).send(body);
    } catch (err) {
      next(err);
    }
  },

  // 게시글 하나 읽기
  getPost: async (req, res, next) => {
    try {
      const postId = req.params.id;
      
      const data = await BoardService.findPost({ postId });
      
      if (!data) { 
        const body = {
          code: 404,
          message: "존재하지 않는 게시글입니다.",
        };
        
        return res.status(404).send({error: body});
      }
      
      // 문자열을 배열로 변환
      data.images = JSON.parse(data.images);

      const body = {
        code: 200,
        message: "글 조회에 성공하였습니다.",
        data,
      };

      return res.status(200).send(body);
    } catch (err) {
      next(err);
    }
  },

  // 게시글 수정
  editPost: async (req, res, next) => { 
    try { 
      const userId = req.currentUserId;
      const id = req.params.id;
      const title = req.body.title;
      const content = req.body.content;

      const toUpdate = {
        title,
        content,
      };

      Object.keys(toUpdate).forEach((key) => {
        if (toUpdate[key] === undefined || toUpdate[key] === null) {
          delete toUpdate[key];
        }
      });

      const isPostExist = await BoardService.findPost({ postId: id });
      if (!isPostExist) {
        const body = {
          code: 404,
          message: "존재하지 않는 게시글입니다.",
        };

        return res.status(404).send({error: body});
      }

      if (isPostExist.userId !== userId) {
        const body = {
          code: 403,
          message: "본인이 작성한 글만 수정 가능합니다.",
        };

        return res.status(403).send({error: body});
      }

      let data = await BoardService.updatePost({ id, toUpdate });
      data = await BoardService.findPost({ postId: id });
      // 문자열을 배열로 변환
      data.images = JSON.parse(data.images);
      const body = {
        code: 200,
        message: "글 정보 수정에 성공하였습니다.",
        data,
      };

      return res.status(200).send(body);
    } catch (err) {
      next(err);
    }
  },

  // 게시글 삭제
  deletePost: async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const id = req.params.id;

      const isPostExist = await BoardService.findPost({ postId: id });
      if (!isPostExist) {
        const body = {
          code: 404,
          message: "존재하지 않는 게시글입니다.",
        };

        return res.status(404).send({ error: body });
      }

      if (isPostExist.userId !== userId) {
        const body = {
          code: 403,
          message: "본인이 작성한 글만 삭제 가능합니다.",
        };

        return res.status(403).send({ error: body });
      }

      await BoardService.removePost({ id });
      
      const body = {
        code: 200,
        message: "글 삭제에 성공하였습니다.",
      };

      return res.status(200).send(body);
    } catch (err) {
      next(err);
    }
  },


  /********** 댓글 **********/

  // 댓글 작성
  createComment: async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const postId = req.params.postId;
      const content = req.body.content;

      const isPostExist = await BoardService.findPost({ postId });
      if (!isPostExist) {
        const body = {
          code: 404,
          message: "존재하지 않는 게시글입니다.",
        };

        return res.status(404).send({ error: body });
      }

      await BoardService.postComment({ userId, postId, content });

      const data = await BoardService.getPostCmulter

      const body = {
        code: 201,
        message: "댓글 작성에 성공하였습니다.",
        data,
      };

      return res.status(200).send(body);


    } catch (err) { 
      next(err); 
    }  
  },

  // 댓글 조회
  getPostComments: async (req, res, next) => {
    try {
      const postId = req.params.postId;

      // 글이 존재하는지 확인
      const isPostExist = await BoardService.findPost({ postId });
      if (!isPostExist) {
        const body = {
          code: 404,
          message: "존재하지 않는 게시글입니다.",
        };

        return res.status(404).send({ error: body });
      }

      const data = await BoardService.getPostComments({ postId });
      const body = {
        code: 200,
        message: "댓글 조회에 성공하였습니다.",
        data,
      };

      return res.status(200).send(body);
    } catch (err) {
      next(err);
    }
  },
};


export { boardController };