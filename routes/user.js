
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

router.get('/applicants', (req, res, next) => {
  User.find({ userType: 'applicant' })
    .then((userData) => {
      res.json(userData);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then((userData) => {
      res.json(userData);
    })
    .catch(next);
});

module.exports = router;
