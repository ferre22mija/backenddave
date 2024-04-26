const userDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const jwt = require("jsonwebtoken");
require("dotenv").config();
const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshtoken = cookies.jwt;
  const foundUser = userDB.users.find(
    (person) => person.refreshtoken === refreshtoken
  );
  if (!foundUser) return res.sendStatus(403); //forbidden

  //evaluate password
  jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.status(403).send("failed evaluated password on refresh token");
    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        userInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};
module.exports = { handleRefreshToken };
