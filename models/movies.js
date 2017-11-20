var mongoose = require('mongoose');
var ShowSchema = new mongoose.Schema({
  title: String,
  url: {type: String, default: "https://s-media-cache-ak0.pinimg.com/736x/fc/7e/ce/fc7ece8e8ee1f5db97577a4622f33975--photo-icon-sad.jpg"},
  type: {type: String, default: "Unlisted"},
  upvotes: {type: Number, default: 0},
});
ShowSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Show', ShowSchema);
