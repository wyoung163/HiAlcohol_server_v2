import { db } from "../../config/db.js";

const BoardService = {
  /********** 게시글 **********/

  /** 게시글 생성 함수
   * 
   * @param {Number} userId - 글 쓴 유저
   * @param {String} title - 글 제목
   * @param {String} content - 내용 
   * @returns createdPost
   */
  create: async ({ userId, title, content, images }) => {
    const createQuery = `
      insert into post(userId, title, content, images, createdate)
      values(?, ?, ?, ?, now())
    `;
    const post = await db.query(createQuery, [userId, title, content, images]);
    const createdPostId = post[0].insertId;
    const getCreatedPostQuery = `
      select p.id, p.userId, u.nickname, p.title, p.content, p.images, p.createdate
      from post as p
      join user as u on u.id = p.userId
      where p.id = ?
    `;
    const createdPost = await db.query(getCreatedPostQuery, [createdPostId]);
    return createdPost[0][0];
  },

  /** 게시글 이미지 추가 함수
   * 
   * @param {Array} images - 글 이미지 
   * @returns createdPost
   */
  createImages: async ({ id, images }) => {
    const createQuery = `
      UPDATE post set images = ?
      WHERE id = ?
    `;
    await db.query(createQuery, [images, id]);

    const getPostQuery = `
      SELECT p.id, u.nickname, p.title, p.content, p.images, p.createdate
      FROM post as p
      JOIN user as u ON u.id = p.userId
      WHERE p.id = ?
    `;
    const createdPost = await db.query(getPostQuery, [id]);
    return createdPost[0][0];
  },

   /** 전체 글 좋아요 내림차순 조회 함수
   * 
   * @returns postList
   */
    findPostByLike: async () => { 
      const getPostListQuery = `
        SELECT post.*, count(liked.postId) 'likes'
        FROM (
          SELECT post.id 'id', user.id 'userId', user.nickname 'nickname', post.title, post.createdate
          FROM post, user
          WHERE post.userId = user.id
          AND post.blind = 0
        ) post
        LEFT JOIN liked ON post.id = liked.postId
        GROUP BY liked.postId
        ORDER BY likes DESC
      `;
      const [postList] = await db.query(getPostListQuery);
      return postList;
    },

  /** 전체 글 createdate 내림차순 조회 함수
   * 
   * @returns postList
   */
  findPostList: async () => { 
    const getPostListQuery = `
      SELECT post.*, count(liked.postId) 'likes'
      FROM (
        SELECT post.id 'id', user.id 'userId', user.nickname 'nickname', post.title, post.createdate
        FROM post, user
        WHERE post.userId = user.id
        AND post.blind = 0
      ) post
      LEFT JOIN liked ON post.id = liked.postId
      GROUP BY liked.postId
      ORDER BY post.createdate DESC
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
    const getPostQuery = `
      SELECT p.id, p.userId, u.nickname, p.title, p.content, p.images, p.createdate
      FROM post as p
      JOIN user as u ON u.id = p.userId
      WHERE p.id = ?
      AND p.blind = 0
    `;
    const post = await db.query(getPostQuery, [postId]);
    return post[0][0];
  },

  /** 글 수정 함수
   * 
   * @param {INTEGER} id - 글 id 
   * @param {Object} toUpdate - 업데이트할 글 정보
   * @returns updatedUser
   */
  updatePost: async ({ id, toUpdate }) => {
    const updatePostQuery = `
      update post set title = ?, content = ?, updatedate = now()
      where id = ?
    `;
    const updatedPost = await db.query(updatePostQuery, [toUpdate.title, toUpdate.content, id]);
    return updatedPost;  
  },

  /** 글 삭제 함수
   * 
   * @param {id} - 글 id 
   * @returns deletedPost
   */
  removePost: async ({ id }) => {
    const deletePostQuery = `
      update post set updatedate = now(), blind = 2
      where id = ?
    `;
    const deletedPost = await db.query(deletePostQuery, [id]);
    return deletedPost;
  },

  
  /********** 댓글 **********/

  /** 댓글 작성 함수
   * 
   * @param {Number} postId - 글 id
   * @param {String} content - 댓글 내용
   * @retrun createComment 
   */
  postComment: async ({ userId, postId, content }) => {
    const createCommentQuery = `
      insert into comment(userId, postId, content, createdate)
      values(?, ?, ?, now())
    `;
    const createComment = await db.query(createCommentQuery, [userId, postId, content]);
    console.log("createComment", createComment);
    return createComment;
  },

  /** 댓글이 존재하는지 확인하는 함수
   * 
   * @returns 
   */
  getComment: async ({ id }) => {
    const getCommentQuery = `
      SELECT *
      FROM comment
      WHERE id = ?
      AND blind = 0
    `;
    const comment = await db.query(getCommentQuery, [id]);
    return comment[0][0];
  },

  /** 글에 달린 댓글 조회 함수
   * 
   * @param {Number} postId - 글 id 
   * @returns comments
   */
  getPostComments: async ({ postId }) => {
    const getCommentQuery = `
      SELECT c.id, c.userId, u.nickname, p.id as postId, c.content, c.createdate
      FROM comment as c
      JOIN post as p ON p.id = c.postId
      JOIN user as u ON u.id = c.userId
      WHERE c.postId = ?
      AND c.blind = 0
    `;
    const comments = await db.query(getCommentQuery, [postId]);
    return comments[0];
  },
  
  /** 댓글 수정 함수
   * 
   * @param {Number} id - 댓글 id
   * @param {String} content - 수정할 댓글 내용
   * @returns updateComment
   */
   updateComment: async ({ id, content }) => {
    const updateCommentQuery = `
      update comment set content = ?
      where id = ?
    `;
    const updateComment = await db.query(updateCommentQuery, [content, id]);
    return updateComment;
  },

  /** 댓글 삭제 함수
   * 
   * @param {Number} id - 댓글 id
   * @returns comment
   */
  removeComment: async ({ id }) => {
    const deleteCommentQuery = `
      update comment set blind = 2
      where id = ?
    `;
    const deleteComment = await db.query(deleteCommentQuery, [id]);
    return deleteComment;
  },
};


export { BoardService };