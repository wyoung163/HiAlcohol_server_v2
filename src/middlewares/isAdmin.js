import { db } from "../../config/db.js";

async function isAdmin(req, res, next) {
  try {
    const userId = req.currentUserId;

    const checkAdminQuery = `
        select role
        from user
        where kakaoid = ?
    `;
    const role = await db.query(checkAdminQuery, [userId]);

    if(role[0][0].role != "admin"){
        res.status(403).send("관리자 계정으로만 접근이 가능합니다.");
        return;
    } else {
        next();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("사용자가 일반 회원인지, 관리자인지 식별하는데 실패하였습니다. ");
    return;
  }
}

export { isAdmin };