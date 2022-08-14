import { UserService } from "../services/userService.js";
import { BoardService } from "../services/boardService.js";

const boardController = {
  /********** 게시글 **********/

  // 글 작성
  createPost: async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const title = req.body.title;
      const content = req.body.content;
      const files = req.files;
      let images = [];
      console.log("req ==", req);
      // 이미지가 없다면 바로 글 작성 성공시키기
      if (files !== undefined) { 
        images = files.map((v) => v.location);
      }
      // 배열을 저장하기 위해 문자열로 변환
      // 이미지가 없다면 null로
      images = images.length === 0 ? null : JSON.stringify(images);

      // 유저가 존재하는지 확인
      const isUserExist = await UserService.getUserInfo({ id: userId });
      if (isUserExist.length === 0) { 
        const body = {
          code: 404,
          message: "존재하지 않는 유저입니다.",
        };

        return res.status(404).send({ error: body });
      }

      const insertId = await BoardService.create({ userId, title, content, images });
      const data = await BoardService.findPost({ userId, postId: insertId });

      // 이미지가 존재한다면
      if (data.images !== undefined) {
        // 문자열을 배열로 변환
        data.images = JSON.parse(data.images);
      }
      
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
      const userId = req.currentUserId;
      const postId = req.params.id;
      const files = req.files;
      
      // 이미지가 없다면 바로 글 작성 성공시키기
      if (files === undefined) {
        const data = await BoardService.findPost({ userId, postId });
        
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

      const data = await BoardService.createImages({ postId, images });
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
      const userId = req.currentUserId;
      const option = req.query.option ?? null;
      let data = await BoardService.findPostList({ userId, option });
        
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
      const userId = req.currentUserId;
      const postId = req.params.id;
      
      let data = await BoardService.findPost({ userId, postId });
      
      if (!data) { 
        const body = {
          code: 404,
          message: "존재하지 않는 게시글입니다.",
        };
        
        return res.status(404).send({error: body});
      }

      data = await BoardService.findUserLike({ userId, postId: data.postId, post: data });

      if (data.images !== undefined) {
        data.images = JSON.parse(data.images);
      }

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
      const postId = req.params.id;
      const title = req.body.title;
      const content = req.body.content;
      const files = req.files;
      console.log("req ==", req);

      // 유저가 존재하는지 확인
      const isUserExist = await UserService.getUserInfo({ id: userId });
      if (isUserExist.length === 0) { 
        const body = {
          code: 404,
          message: "존재하지 않는 유저입니다.",
        };

        return res.status(404).send({ error: body });
      }

      const toUpdate = {
        title,
        content,
      };

      Object.keys(toUpdate).forEach((key) => {
        if (toUpdate[key] === undefined || toUpdate[key] === null) {
          delete toUpdate[key];
        }
      });

      let images = files.map((v) => v.location);
      // 배열을 저장하기 위해 문자열로 변환
      images = JSON.stringify(images);

      const isPostExist = await BoardService.findPost({ userId, postId });
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

      let data = await BoardService.updatePost({ postId, toUpdate });
      data = await BoardService.createImages({ postId, images });
      data = await BoardService.findPost({ userId, postId });

      // 이미지가 존재한다면
      if (data.images !== undefined) {
        // 문자열을 배열로 변환
        data.images = JSON.parse(data.images);
      }

      const body = {
        code: 200,
        message: "글 수정에 성공하였습니다.",
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
      const postId = req.params.id;

      // 유저가 존재하는지 확인
      const isUserExist = await UserService.getUserInfo({ id: userId });

      if (isUserExist.length === 0) { 
        const body = {
          code: 404,
          message: "존재하지 않는 유저입니다.",
        };

        return res.status(404).send({ error: body });
      }

      const isPostExist = await BoardService.findPost({ userId, postId });
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

      await BoardService.removePost({ postId });
      
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

      const isUserExist = await UserService.getUserInfo({ id: userId });

      // 유저가 존재하는지 확인
      if (isUserExist.length === 0) { 
        const body = {
          code: 404,
          message: "존재하지 않는 유저입니다.",
        };

        return res.status(404).send({ error: body });
      }

      const isPostExist = await BoardService.findPost({ userId, postId });
      if (!isPostExist) {
        const body = {
          code: 404,
          message: "존재하지 않는 게시글입니다.",
        };

        return res.status(404).send({ error: body });
      }

      await BoardService.postComment({ userId, postId, content });

      const data = await BoardService.getPostComments({ postId });

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
      const userId = req.currentUserId;
      const postId = req.params.postId;

      // 글이 존재하는지 확인
      const isPostExist = await BoardService.findPost({ userId, postId });
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

  // 댓글 수정
  editComment: async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const postId = req.params.postId;
      const commentId = req.params.id;
      const content = req.body.content;

      // 유저가 존재하는지 확인
      const isUserExist = await UserService.getUserInfo({ id: userId });

      if (isUserExist.length === 0) { 
        const body = {
          code: 404,
          message: "존재하지 않는 유저입니다.",
        };

        return res.status(404).send({ error: body });
      }

      // 글이 존재하는지 확인
      const isPostExist = await BoardService.findPost({ userId, postId });
      if (!isPostExist) {
        const body = {
          code: 404,
          message: "존재하지 않는 게시글입니다.",
        };

        return res.status(404).send({ error: body });
      }

      // 댓글이 존재하는지 확인
      const isCommentExist = await BoardService.getComment({ commentId });

      // 댓글이 없다면 오류
      if (!isCommentExist) {
        const body = {
          code: 404,
          message: "존재하지 않는 댓글입니다.",
        };

        return res.status(404).send({ error: body });
      }

      // 댓글을 쓴 유저와 현재 로그인 유저가 다르다면 오류
      if (isCommentExist.userId !== userId) {
        const body = {
          code: 403,
          message: "본인이 작성한 댓글만 수정 가능합니다.",
        };

        return res.status(403).send({ error: body });
      }

      // 댓글 수정
      await BoardService.updateComment({ commentId, content });

      // 댓글 전체 조회
      const data = await BoardService.getPostComments({ postId });
      const body = {
        code: 200,
        message: "댓글 수정에 성공하였습니다.",
        data,
      };

      return res.status(200).send(body);
    } catch (err) {
      next(err);
    }
  },

  deleteComment: async (req, res, next) => {  
    try { 
      const userId = req.currentUserId;
      const postId = req.params.postId;
      const commentId = req.params.id;
      
      // 유저가 존재하는지 확인
      const isUserExist = await UserService.getUserInfo({ id: userId });

      if (isUserExist.length === 0) { 
        const body = {
          code: 404,
          message: "존재하지 않는 유저입니다.",
        };

        return res.status(404).send({ error: body });
      }

      // 글이 존재하는지 확인
      const isPostExist = await BoardService.findPost({ userId, postId });
      if (!isPostExist) {
        const body = {
          code: 404,
          message: "존재하지 않는 게시글입니다.",
        };

        return res.status(404).send({ error: body });
      }

      // 댓글이 존재하는지 확인
      const isCommentExist = await BoardService.getComment({ commentId });

      // 댓글이 없다면 오류
      if (!isCommentExist) {
        const body = {
          code: 404,
          message: "존재하지 않는 댓글입니다.",
        };

        return res.status(404).send({ error: body });
      }

      // 댓글을 쓴 유저와 현재 로그인 유저가 다르다면 오류
      if (isCommentExist.userId !== userId) {
        const body = {
          code: 403,
          message: "본인이 작성한 댓글만 삭제 가능합니다.",
        };

        return res.status(403).send({ error: body });
      }
      
      await BoardService.removeComment({ commentId });
      const data = await BoardService.getPostComments({ postId });

      const body = {
        code: 200,
        message: "댓글 삭제에 성공하였습니다.",
        data,
      };

      return res.status(200).send(body);
    } catch (err) {
      next(err);
    }
  },
};


export { boardController };