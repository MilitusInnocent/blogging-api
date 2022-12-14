const mongoose = require('mongoose');
const { Schema } = mongoose;
//const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postState = {draft: "draft", published: "published"}

const PostSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  title: { type: String, required: true, index: {unique: true, dropDups: true} },
  description: String,
  state: { type: String, required: true, enum: Object.values(postState), default: 'draft'},
  read_count: { type: Number, default: 0 },
  reading_time: {type: String},
  tags: [String],
  body: { type: String, required: true },
  timestamp: {
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}
  },
  author: {type: Schema.Types.ObjectId, ref: 'Users', required: true },

});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = { PostModel, postState};
 