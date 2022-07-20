import { db } from "../../config/db.js";

//로그인한 회원의 좋아요 여부 조회 Query
const likeCheckQuery = `
  SELECT userId 
  FROM liked
  WHERE userId = ? 
  AND postId = ?
`;

const getPostListSortedByLikeQuery = `
  SELECT post.*, count(liked.id) 'count'
  FROM (
    SELECT post.id 'postId', user.id 'userId', user.nickname 'nickname', post.title, post.createdate
    FROM post, user
    WHERE post.userId = user.id
    AND post.blind = 0
  ) post 
  LEFT JOIN liked ON post.postId = liked.postId
  GROUP BY post.postId
  ORDER BY count DESC
`;

const getPostListSortedByCreateDateQuery = `
  SELECT post.*, count(liked.id) 'count'
  FROM (
    SELECT post.id 'postId', user.id 'userId', user.nickname 'nickname', post.title, post.createdate
    FROM post, user
    WHERE post.userId = user.id
    AND post.blind = 0
  ) post
  LEFT JOIN liked ON post.postId = liked.postId
  GROUP BY post.postId
  ORDER BY post.createdate DESC
`;

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
    return post[0].insertId;
  },

  /** 게시글 이미지 추가 함수
   * 
   * @param {Number} id - 글 id
   * @param {Array} images - 글 이미지 
   * @returns createdPost
   */
  createImages: async ({ postId, images }) => {
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
    const createdPost = await db.query(getPostQuery, [postId]);
    return createdPost[0][0];
  },

   /** 전체 글 조회 함수
   * 
   * @param {Number} userId - 회원 id
   * @param {String} options - like / latest
   * @returns postList
   */
  findPostList: async ({ userId, option }) => { 
    let postList;
    switch (option) {
      case "like": 
        [postList] = await db.query(getPostListSortedByLikeQuery);
        break;
      default:
        [postList] = await db.query(getPostListSortedByCreateDateQuery);
    }

    if (userId !== null) {
      for (var i = 0; i < postList.length; i++) {
        const [likeCheck] = await db.query(likeCheckQuery, [userId, postList[i].postId]);
        if (likeCheck.length > 0) {
          Object.assign(postList[i], { "likeSelection": true });
        } else {
          Object.assign(postList[i], { "likeSelection": false });
        }
      }
    }

    return postList;
  },

  /** 글 존재 확인 함수
   * 
   * @param {Number} postId - 글 id
   * @returns post
   */
  findPost: async ({ postId }) => {
    const getPostQuery = `
      SELECT post.*, count(liked.id) 'count'
      FROM (
        SELECT post.id 'postId', user.id 'userId', user.nickname 'nickname', post.title, post.createdate
        FROM post, user
        WHERE post.userId = user.id
        AND post.id = ?
        AND post.blind = 0
      ) post 
      LEFT JOIN liked ON post.postId = liked.postId
      GROUP BY post.postId
    `;
    const post = await db.query(getPostQuery, [postId]);
    return post[0][0];
  },

  /** 회원이 좋아요 눌렀는지 확인하는 함수
   * 
   * @param {Number} userId - 회원 id
   * @param {Number} postId - 글 id
   * @param {Object} post - 글 
   * @returns 
   */
  findUserLike: async ({ userId, postId, post }) => {
    const [likeCheck] = await db.query(likeCheckQuery, [userId, postId]);
    if (likeCheck.length > 0) {
        Object.assign(post, { "likeSelection": true });
    } else {
        Object.assign(post, { "likeSelection": false });
    }
    
    return post;
  },

  /** 글 수정 함수
   * 
   * @param {Number} postId - 글 id 
   * @param {Object} toUpdate - 업데이트할 글 정보
   * @returns updatedUser
   */
  updatePost: async ({ postId, toUpdate }) => {
    const updatePostQuery = `
      update post set title = ?, content = ?, updatedate = now()
      where id = ?
    `;
    const updatedPost = await db.query(updatePostQuery, [toUpdate.title, toUpdate.content, postId]);
    return updatedPost;  
  },

  /** 글 삭제 함수
   * 
   * @param {postId} - 글 id 
   * @returns deletedPost
   */
  removePost: async ({ postId }) => {
    const deletePostQuery = `
      update post set updatedate = now(), blind = 2
      where id = ?
    `;
    const deletedPost = await db.query(deletePostQuery, [postId]);
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
    return createComment;
  },

  /** 댓글이 존재하는지 확인하는 함수
   * 
   * @returns 
   */
  getComment: async ({ commentId }) => {
    const getCommentQuery = `
      SELECT *
      FROM comment
      WHERE id = ?
      AND blind = 0
    `;
    const comment = await db.query(getCommentQuery, [commentId]);
    return comment[0][0];
  },

  /** 글에 달린 댓글 조회 함수
   * 
   * @param {Number} postId - 글 id 
   * @returns comments
   */
  getPostComments: async ({ postId }) => {
    const getCommentQuery = `
      SELECT c.id commentId, c.userId, u.nickname, p.id postId, c.content, c.createdate
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
   updateComment: async ({ commentId, content }) => {
    const updateCommentQuery = `
      update comment set content = ?
      where id = ?
    `;
    const updateComment = await db.query(updateCommentQuery, [content, commentId]);
    return updateComment;
  },

  /** 댓글 삭제 함수
   * 
   * @param {Number} commentId - 댓글 id
   * @returns comment
   */
  removeComment: async ({ commentId }) => {
    const deleteCommentQuery = `
      update comment set blind = 2
      where id = ?
    `;
    const deleteComment = await db.query(deleteCommentQuery, [commentId]);
    return deleteComment;
  },
};


export { BoardService };