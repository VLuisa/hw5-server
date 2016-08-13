import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

UserSchema.pre('save', function beforeyYourModelSave(next) {

  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const model = this;


  //TODO: do stuff here

  // when done run the next callback with no arguments
  // call next with an error if you encounter one
  // return next();

)};

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
