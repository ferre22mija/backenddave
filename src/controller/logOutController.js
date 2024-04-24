const userDB = {
    users: require("../models/users.json"),
    setUsers: function (data) {
      this.users = data;
    },
  };
  const fsPromises = require('fs').promises
  const path = require('path');
  
  const handleLogout = async(req, res) => {
    // on cliente, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // no content
    const refreshtoken = cookies.jwt;
    // is refrestoken in db?
    const foundUser = userDB.users.find(
      (person) => person.refreshtoken === refreshtoken
    );
    if (!foundUser)  {
        res.clearCookie('jwt',{httpOnly:true});
        res.sendStatus(403); //forbidden

    }
    //delete refreshtoken in the db
    const otherUsers = userDB.users.filter(person => person.refreshtoken !== foundUser.refreshtoken)
    const currentUser = {...foundUser,refreshtoken:''};
    userDB.setUsers([...otherUsers,currentUser]);

    await fsPromises.writeFile(
        path.join(__dirname,"..","model","users.json"),
        JSON.stringify(userDB.users)
    )
    res.clearCookie('jwt', {httpOnly:true,sameSite:'None',secure:true}); //secure: true - only servers on https
    res.sendStatus(204);
};
  module.exports = { handleLogout };
  