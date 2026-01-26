const express = require("express");
const db = require("../db");
const { firebaseAuthMiddleware } = require("../middlewares/firebase_auth_middleware");

const router = express.Router();

router.get("/all", firebaseAuthMiddleware, async (req, res) => {
  const client = await db.connect();

  try {
    const result = await client.query(
      `
      select
        ml.id,
        ml.received_at as "receivedAt",
        ml.device_id as "deviceId",
        ml.topic,
        ml.payload
      from mqtt_logs ml
      join devices d
        on d.device_id = ml.device_id
      join user_devices ud
        on ud.device_pk = d.id
      where ud.user_pk = $1
      order by ml.received_at desc;
      `,
      [req.userPk]
    );

    return res.json({
      success: true,
      message: "MQTT 로그 조회에 성공했습니다.",
      data: result.rows,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: e.message,
      data: null,
    });
  } finally {
    client.release();
  }
});

module.exports = router;
