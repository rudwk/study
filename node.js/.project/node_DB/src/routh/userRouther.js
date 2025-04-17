const express = require('express');
const userDBC = require('../mysql/userDBC');
const router = express.Router();



router.get('/getUsers', async(req, res) => {
  let res_getUser = {
    status_code: 500,//아무 일도 일어나지 않으면 500 반환하는듯
    users: []
  };

  try {
    const rows = await userDBC.getUser();
    res_getUser.status_code = 200;

    if(rows.length > 0){
      rows.forEach((user) => {
        res_getUser.users.push({
          userId: user.userId,
          userPW: user.userPW,
          userName: user.userName,
          userSignUpData: user.userSignUpData
        });
      });
    }
    else{console.log('User Not Found');}
  }
  catch(error){console.log(error);}
  finally{
    res.json(res_getUser);
  }
});


module.exports = router;