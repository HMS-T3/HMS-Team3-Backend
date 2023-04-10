module.exports.home = (req, res) => {
  res.status(200).json({ msg: "Server running" });
};
