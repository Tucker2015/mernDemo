const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    username: String,
    title: String,
    body: String,
    date: {
        type: String,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000

    }
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;