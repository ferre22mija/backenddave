const userDB = {
    users: require("../models/users.json"),
    setUsers: function (data) {
      this.users = data;
    },
  };


const readController = (req,res)=>{
    res.json(userDB.users);
}
module.exports = {readController}