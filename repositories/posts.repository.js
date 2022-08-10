const { Post } = require('../models');

class PostRepository {
  findAllPost = async () => {
    const posts = await Post.findAll();
    return posts;
  }

  createPost = async (nickname, title, content) => {
    const createPostData = await Post.create({ nickname, title, content });
    return createPostData;
  }

  findPost = async(postId) =>{
    
    const posts = await Post.findOne({ where: { id: postId } })

    return posts;
  }
  updatePost = async (postId, title, content) =>{
    const targetPost = await Post.findOne({ where: {id: postId} })
    const posts = await targetPost.update({ 
                                             content,
                                             title 
                                        });
    return posts;
    
  }
  
  deletePost = async (postId) => {
    const deletePosts = await Post.destroy({ where: { id: postId } })
    return deletePosts
}
}

module.exports = PostRepository;