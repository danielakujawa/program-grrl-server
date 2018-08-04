
'use strict';
const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.put('/me', (req, res, next) => {
  const name = req.body.name;

  User.findOneAndUpdate({name}, 'name')
    .then((userExists) => {
      const newUser = User({
        name
      });

      return newUser.save()
        .then(() => {
          req.session.currentUser = newUser;
          res.json(newUser);
        });
    })
    .catch(next);
});
