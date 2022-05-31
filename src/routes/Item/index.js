const router = require('express').Router();

const api = require("../../controllers/Item");
const { upload } = require("../../utils/helper.imageUploader");

router.get("/get-single-item/:id", api.getItem);
router.get("/get-all-items", api.getItems);
router.get("/get-items-by-category/:id", api.getItemsByCategory);
router.post("/create", upload, api.createItem);
router.put("/update-item/:id", api.updateItem);
router.delete("/delete/:id", api.deleteItem); 

module.exports = router;