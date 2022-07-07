import User from "../models/user.js";

import axios from "axios";
import jwt from "jsonwebtoken";

const UserService = {
  /** 회원 생성 함수
   * 
   * @param {Object} newUser - 생성할 회원 Object 
   * @returns createNewUser
   */
   upsertKakaoUser: async ({ code  }) => {

  },

  /** 회원 존재 확인 함수
   * 
   * @param {INTEGER} id - 회원 id
   * @returns user
   */
  getUserInfo: async ({ id }) => {
    
  },

  /** 회원 정보 수정 함수
   * 
   * @param {INTEGER} id - 회원 id 
   * @param {Object} toUpdate - 업데이트할 유저 정보
   * @returns updatedUser
   */
  editUserInfo: async ({ id, toUpdate }) => {
  
  },
};


export { UserService };