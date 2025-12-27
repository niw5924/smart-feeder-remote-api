const admin = require("firebase-admin");

const firebaseAuthMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.uid = decoded.uid;
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "유효하지 않은 토큰입니다.",
      data: null,
    });
  }
};

module.exports = { firebaseAuthMiddleware };
