const router = require('express').Router();
const api = require("../../controllers/User");

router.post("/register", api.register);
router.post("/login", api.login);

module.exports = router;