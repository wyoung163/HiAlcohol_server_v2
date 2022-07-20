import { UserService } from "../services/userService.js";

const userController = {
  // 회원가입
  createUser: async (req, res, next) => {
    try {
      const code = req.query.code;
      const user = await UserService.upsertKakaoUser({ code });
  
      const redirect_uri = `http://localhost:3000/login/kakao?token=${user.token}`;
  
      res.status(200).redirect(redirect_uri);
    } catch (err) {
      next(err);
    }
  },
  
  // 회원 정보 조회
  findUserInfo: async (req, res, next) => {
    try { 
      const id = req.currentUserId;
      const data = await UserService.getUserInfo({ id });

      if (data.length === 0) { 
        const body = {
          code: 404,
          message: "존재하지 않는 유저입니다.",
        };

        return res.status(404).send({ error: body });
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

  // 회원 정보 수정
  updateUserNickname: async (req, res, next) => { 
    try { 
      const id = req.currentUserId;
      const nickname = req.body.nickname;
      const toUpdate = {
        nickname,
      };

      const data = await UserService.editUserNickname({ id, toUpdate });

      if (data.length === 0) { 
        const body = {
          code: 404,
          message: "존재하지 않는 유저입니다.",
        };

        return res.status(404).send({ error: body });
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

  updateUserImage: async (req, res, next) => { 
    try { 
      const id = req.currentUserId;
      const profile_url = req.file?.location ?? null;
      
      const toUpdate = {
        profile_url,
      };

      const data = await UserService.editUserImage({ id, toUpdate });

      if (data.length === 0) { 
        const body = {
          code: 404,
          message: "존재하지 않는 유저입니다.",
        };

        return res.status(404).send({ error: body });
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

  // 회원이 작성한 꿀조합 게시글 목록 조회
  findUserBoard: async (req, res, next) => { 
    try {
      const id = req.currentUserId;
      
      const isUserExist = await UserService.getUserInfo({ id });
      if (isUserExist.length === 0) { 
        const body = {
          code: 404,
          message: "존재하지 않는 유저입니다.",
        };

        return res.status(404).send({ error: body });
      }

      const data = await UserService.getUserBoard({ id });
      
      const body = {
        code: 200,
        message: "게시글 조회에 성공하였습니다.",
        data,
      };

      return res.status(200).send(body);
    } catch (err) { 
      next(err);
    }
  },

  // 회원이 누른 꿀조합 게시글 좋아요 목록 조회
  findUserLike: async (req, res, next) => {
    try {
      const userId = req.currentUserId;

      const isUserExist = await UserService.getUserInfo({ id: userId });
      if (isUserExist.length === 0) { 
        const body = {
          code: 404,
          message: "존재하지 않는 유저입니다.",
        };

        return res.status(404).send({ error: body });
      }

      const data = await UserService.getUserLike({ userId });

      const body = {
        code: 200,
        message: "좋아요 목록 조회에 성공하였습니다.",
        data,
      };

      return res.status(200).send(body);
    } catch (err) { 
      next(err);
    }
  }
};


export { userController };