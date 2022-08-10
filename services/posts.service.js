const PostRepository = require('../repositories/posts.repository');
const { post } = require('../routes');

class PostService {
    postRepository = new PostRepository();
    
    findAllPost = async () => {
      const allPost = await this.postRepository.findAllPost();
      allPost.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
      return allPost.map(post => {
        return {
          postId: post.id,
          nickname: post.nickname,
          title: post.title,
          Like : post.Like,
          content: post.content,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt
        }
      });
      
    }
  
    createPost = async (nickname, title, content) => {
        if(!title || !content){
            return {errorMessage : "제목 및 내용을 작성 해주세요."};     
            }
        const createPostData = await this.postRepository.createPost(nickname, title, content);  
        return {
            postId: createPostData.id,
            nickname: createPostData.nickname,
            title: createPostData.title,
            Like : createPostData.Like,
            content: createPostData.content,
            createdAt: createPostData.createdAt,
            updatedAt: createPostData.updatedAt,
        };
    }
    findPost = async (postId) => {
        const post = await this.postRepository.findPost(postId);
        return {
            postId: post.id,
            nickname: post.nickname,
            title: post.title,
            Like : post.Like,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
          }
        ;
    }
    updatepost = async (postId, title, content, nickname) => {
        const post = await this.postRepository.findPost(postId);
        if(!title || !content){
        console.log("제목 및 내용을 작성 해주세요.")
        return {errorMessage : "제목 및 내용을 작성 해주세요."};     
        }else{

        
        const updatePostData = await this.postRepository.updatePost(postId, title, content);
        
        return {
            postId: updatePostData.id,
            nickname: updatePostData.nickname,
            title: updatePostData.title,
            Like : updatePostData.Like,
            content: updatePostData.content,
            createdAt: updatePostData.createdAt,
            updatedAt: updatePostData.updatedAt
          };  
        }   
    }
    deletePost = async (postId, nickname) => {
        const post = await this.postRepository.findPost(postId);
        if (nickname !== post.nickname){
        return {errorMessage : "본인글만 삭제할 수 있습니다."};     
        }
        const deletePost = await this.postRepository.deletePost(postId);
        return  { Message : "게시글이 삭제 되었습니다."}
    }
}

  module.exports = PostService;


