'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({

  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true,
    enum: ['applicant', 'sponsor']
  },
  complete: {
    type: Boolean
  },
  image: {
    type: String,
    default: 'https://cdn1.vectorstock.com/i/thumb-large/45/70/female-avatar-profile-picture-silhouette-light-vector-4684570.jpg'
  },
  name: {
    type: String
  },
  country: {
    type: String
  },
  languages: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  programmingLanguages: [{
    type: String,
    enum: ['javascript', 'python', 'ruby', 'java', 'others']
  }],
  sponsor: {
    type: ObjectId,
    ref: 'User'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
