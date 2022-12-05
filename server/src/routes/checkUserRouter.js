const router = require('express').Router();
// const { User } = require('../../../db/models');

router.get('/', (req, res) => {
  console.log(2222);
  // const { newUser, newUserEmail, newUserId, newUserStatus } = req.session;
  // if (req.session.newUser) {
  //   res.json({
  //     login: newUser,
  //     email: newUserEmail,
  //     id: newUserId,
  //     status: newUserStatus,
  //   });
  // } else {
  // res.end();
  res.json({ name: 'hehe' });

  // }
});

module.exports = router;
