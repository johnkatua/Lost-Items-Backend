const router = require('express').Router();
const api = require("../../controllers/Genre");

router.get("/", api.getGenres);
router.post("/create", api.createGenre);

module.exports = router;
