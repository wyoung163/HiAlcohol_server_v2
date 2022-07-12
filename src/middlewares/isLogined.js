import jwt from "jsonwebtoken";

function isLogined(req, res, next) {
    // request 헤더로부터 authorization bearer 토큰을 받음.
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

    if (userToken === 'null') {
        next();
    } else {
        // 토큰에 담긴 user_id 정보 추출
        try {
            const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
            const jwtDecoded = jwt.verify(userToken, secretKey);
            const id = jwtDecoded.id;
            req.currentUserId = id;
            next();
        } catch (error) {
            res.status(400).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
            return;
        }
    }
}

export { isLogined };