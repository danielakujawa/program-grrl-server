
'use strict';
const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.put('/me', (req, res, next) => {
  const currentUserId = req.session.currentUser._id;
  const options = {new: true};
  req.body.complete = true;

  User.findByIdAndUpdate(currentUserId, req.body, options)
    .populate('sponsor')
    .then((updatedUser) => {
      req.session.currentUser = updatedUser;
      res.json(updatedUser);
    })
    .catch(next);
});

router.get('/applicants', (req, res, next) => {
  User.find({ userType: 'applicant', complete: true, sponsor: { $exists: false } })
    .populate('sponsor')
    .then((userData) => {
      res.json(userData);
    })
    .catch(next);
});

router.get('/applicants/:language', (req, res, next) => {
  const languageFilter = req.params.language;
  User.find({ userType: 'applicant', complete: true, sponsor: { $exists: false }, programmingLanguages: languageFilter })
    .populate('sponsor')
    .then((userData) => {
      res.json(userData);
    })
    .catch(next);
});

router.post('/:applicantId/sponsor', (req, res, next) => {
  const applicantId = req.params.applicantId;
  const sponsorId = req.session.currentUser._id;
  const update = { sponsor: sponsorId };

  User.findByIdAndUpdate(applicantId, update)
    .then(() => {
      return User.find(update, {username: 1, image: 1})
        .then((result) => {
          console.log(result);
          res.json(result);
        });
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  let data = {};

  User.findById(req.params.id)
    .populate('sponsor')
    .then((userData) => {
      data.profile = userData;
      if (userData.userType === 'sponsor') {
        return User.find({sponsor: userData._id});
      }
    })
    .then((sponsoredUsers) => {
      data.sponsoredUsers = sponsoredUsers;
      res.json(data);
    })
    .catch(next);
});

module.exports = router;
