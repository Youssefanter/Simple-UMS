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
      //res.send(data);
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occuerd while creating operation",
      });
    });
};

//retrive and get all users
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    userdb
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ Messsage: "Not found data with id=" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retriving user id=" + id });
      });
  } else {
    userdb
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occuerd while retriving user information",
        });
      });
  }
};

//update a new identified user
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  userdb
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

//delete a user with specified id
exports.delete = (req, res) => {
  const id = req.params.id;
  userdb
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `cannot delete with id: ${id}. Maybe user not found!`,
        });
      } else {
        res.send({
          message: "User was deleted succenfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
