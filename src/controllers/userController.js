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

  // 회원 정보 수정
  updateUserInfo: async (req, res, next) => { 
    try { 
      const id = req.currentUserId;
      const profile_url = req.file?.profile_url;
      const nickname = req.body.nickname;

      const toUpdate = {
        profile_url,
        nickname,
      };

      const data = await UserService.editUserInfo({ id, toUpdate });

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


export { userController };