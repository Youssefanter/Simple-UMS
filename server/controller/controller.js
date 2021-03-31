var userdb = require("../model/model");

//create and save new user

exports.create = (req, res) => {
  //validate user
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }
  //new user
  const user = new userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occuerd while creating operation",
      });
    });
};

//retrive and get all users
exports.find = (req, res) => {};

//update a new identified user
exports.update = (req, res) => {};

//delete a user with specified id
exports.delete = (req, res) => {};
