
'use strict';
const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.put('/me', (req, res, next) => {
  const currentUserId = req.session.currentUser._id;
  const options = {new: true};

  User.findByIdAndUpdate(currentUserId, req.body, options)
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch(next);
});

module.exports = router;
