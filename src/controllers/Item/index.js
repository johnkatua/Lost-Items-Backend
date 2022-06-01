const Item = require("../../model/Item");
const itemValidation = require("../../validation/Item/index");

const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate("userId").exec();
    if(items.length === 0) {
      return res.status(404).send({
        items: [],
        status: "error",
        error: "No items found"
      });
    };
    const data = items.map(item => {
      return {
        id: item._id,
        name: item.name,
        description: item.description,
        photo: item.photo,
        status: item.status,
        userId: item.userId._id,
        genreId: item.genreId._id,
        userPhone: item.userId.phone,
        userEmail: item.userId.email
      };
    });
    return res.status(200).send({
      data: data,
      status: "success",
      message: "Items retrieved successfully"
  });
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
};

const getItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).send({
        item: {},
        status: "error",
        error: "Item not found"
      });
    }
    return res.status(200).send({
      item,
      status: "success",
      message: "Item retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
};

const createItem = async (req, res) => {
  const { name, description, userId, genreId, status } = req.body;
  const photo = req.file.path;
  const response = itemValidation({ name, description, userId, genreId, status, photo });
  if (response.error) {
    return res.status(400).send(response.error.details[0].message);
  };

  const item = await Item.findOne({ name });
  if (item) {
    return res.status(400).send("Item already exists");
  };

  const newItem = new Item({
    name,
    description,
    photo,
    userId,
    genreId,
    status
  });

  try {
    const savedItem = await newItem.save();
    res.status(200).send({
      message: "Item created successfully",
      data: savedItem
    });
  } catch (error) {
    res.status(400).send({
      message: error
    });
  }
};

const getItemsByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const items = await Item.find({ genreId: id }).populate("userId").exec();
    if(items.length === 0) {
      return res.status(404).send({
        data: [],
        status: "error",
        error: "No items found"
      });
    };
    return res.status(200).send({
      data: items,
      status: "success",
      message: "Items retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!item) {
      return res.status(404).json({
        item: {},
        status: "error",
        error: "Item not found"
      });
    };
    return res.status(200).send({
      item,
      status: "success",
      message: "Item updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    await item.remove();
    return res.status(200).send({
      message: "Item deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

module.exports = {
  getItem,
  getItems,
  createItem,
  getItemsByCategory,
  updateItem,
  deleteItem,
};