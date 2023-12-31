const { User } = require("../models");

exports.create = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json(newUser);
};

exports.findAll = async (_, res) => {
  const users = await User.findAll();

  res.status(200).json(users);
};

exports.findUserByUsername = async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ where: { userName: username } });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user);
};

exports.findUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  res.status(200).json(user);
};

exports.findUserByUsername = async (req, res) => {
  const currentUserName = req.params.userName;
  const user = await User.findAll({ where: { userName: currentUserName } });

  res.status(200).json(user);
};

exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updatedUser = await User.update(req.body, {
    where: { id: userId },
  });

  if (updatedUser[0] === 0) {
    return res.status(404).json({ error: "User not found!" });
  }
  res.status(200).json({ message: "User updated!" });
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;
  const deletedUser = await User.destroy({ where: { id: userId } });

  if (deletedUser === 0) {
    return res.status(404).json({ error: "User not found!" });
  }

  res.status(200).json({ message: "User deleted!" });
};

exports.saveProfilePic = async (req, res) => {
  const userId = req.params.id;
  await User.update(req.body, { where: { id: userId } });

  res.status(200).json({ message: "Picture uploaded!" });
};
