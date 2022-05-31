const Genre = require("../../model/Genre");
const genreValidate = require("../../validation/Genre");

const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    if (genres.length === 0) {
      return res.status(404).send({
        genres: [],
        status: "error",
        error: "No genres found",
      });
    };
    const data = genres.map(genre => {
      return {
        id: genre._id,
        name: genre.name,
      };
    });
    return res.status(200).send({
      data: data,
      status: "success",
      message: "Genres retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
};

const createGenre = async (req, res) => {
  const { name } = req.body;

  const response = genreValidate({ name });

  if (response.error) {
    return res.status(400).json({
      message: "Error creating genre",
      error: response.error.details[0].message,
    });
  };

  const findGenre = await Genre.findOne({ name });

  if (findGenre) {
    return res.status(400).json({
      message: "Genre already exists",
    });
  };

  const genre = new Genre({
    name,
  });

  try {
    const savedGenre = await genre.save();
    res.status(200).send({
      message: "Genre created successfully",
      genre: savedGenre.name,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating genre",
      error,
    });
  }
};

module.exports = {
  getGenres,
  createGenre,
};