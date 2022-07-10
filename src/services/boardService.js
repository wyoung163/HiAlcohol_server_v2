import { db } from "../../config/db.js";

const BoardService = {
  /** 게시글 생성 함수
   * 
   * @param {Object} newUser - 생성할 회원 Object 
   * @returns createNewUser
   */
  create: async ({ userId, title, content }) => {
    const createQuery = `
      insert into post(userId, title, content, createdate)
      values(?, ?, ?, now())
    `;
    const post = await db.query(createQuery, [userId, title, content]);
    const createdPostId = post[0].insertId;
    const getCreatedPostQuery = `
      select p.id, u.nickname, p.title, p.content, p.images, p.createdate
      from post as p
      join user as u on u.kakaoid = p.userId
      where p.id = ?
    `;
    const [createdPost] = await db.query(getCreatedPostQuery, [createdPostId]);
    return createdPost;
  },

  createImages: async ({ id, images }) => {
    const createQuery = `
      UPDATE post set images = ?
      WHERE id = ?
    `;
    const post = await db.query(createQuery, [id, images]);
    const getPostQuery = `
      select p.id, u.nickname, p.title, p.content, p.images, p.createdate
      from post as p
      join user as u on u.kakaoid = p.userId
      where p.id = ?
    `;
    const [createdPost] = await db.query(getCreatedPostQuery, [id]);
    return createdPost;
  },

  /** 전체 글 조회 함수
   * 
   * @returns postList
   */
  findPostList: async () => { 
    const getPostListQuery = `
      SELECT p.id, u.nickname, p.title, p.content, p.createdate
      FROM post as p
      JOIN user as u ON u.id = p.userId
      WHERE blind = 0
    `;
    const [postList] = await db.query(getPostListQuery);
    return postList;
  },

  /** 글 존재 확인 함수
   * 
   * @param {INTEGER} postId - 글 id
   * @returns post
   */
  findPost: async ({ postId }) => {
    console.log("postId ===>", postId);
    const getPostQuery = `
      SELECT p.id, u.nickname, p.title, p.content, p.images, p.createdate
      FROM post as p
      JOIN user as u ON u.id = p.userId
      WHERE p.id = ?
    `;
    const [post] = await db.query(getPostQuery, [postId]);
    return post;
  },

  /** 회원 정보 수정 함수
   * 
   * @param {INTEGER} id - 회원 id 
   * @param {Object} toUpdate - 업데이트할 유저 정보
   * @returns updatedUser
   */
  editUserInfo: async ({ id, toUpdate }) => {
    const updatedUser = await User.update(
      toUpdate,
      {
        where: {
          id,
        },
      });
    return updatedUser;
  },
};


export { BoardService };