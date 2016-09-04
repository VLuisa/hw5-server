import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const PostSchema = new Schema({
  title: String,
  tags: String,
  content: String,
  username: { type: Schema.Types.ObjectId, ref: 'User' },
},
  {
    timestamps: true,
  });

// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
