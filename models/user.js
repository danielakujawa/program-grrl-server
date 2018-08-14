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
    enum: ['http://res.cloudinary.com/dlbsug8tm/image/upload/v1533846339/pg-users/cate.jpg', 'http://res.cloudinary.com/dlbsug8tm/image/upload/v1533846339/pg-users/fabiola.jpg']
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
    type: String
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
