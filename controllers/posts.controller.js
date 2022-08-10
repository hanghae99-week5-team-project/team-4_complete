// controllers/posts.controller.js

const PostService = require('../services/posts.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.
  
//게시글 전체 조회
  getPosts = async (req, res, next) => {
    const posts = await this.postService.findAllPost();
    res.status(200).json({ data: posts })
  }

//게시글 작성
  createPost =  async (req, res, next) => {
    try {
        const { nickname }= res.locals.user
        const { title, content } = req.body;
        const createPostData = await this.postService.createPost(nickname, title, content);
        
    if (createPostData.errorMessage) {
        res.status(400).send(
          createPostData
        );
      return
    }    
        res.status(201).json({ data: createPostData });
    
    }catch(err){ 
        console.log(err);
        res.status(400).send({
        errorMessage: "요청한 데이터 형식이 알맞지 않습니다.",
    });
}}

//게시글 상세조회
  getPost =  async (req, res, next) => {
    const { postId } = req.params; 
    const posts = await this.postService.findPost(postId);
    res.status(200).json({ data: posts })
  }


//게시글 수정

  updatePost = async (req, res, next) => {
    try {
        const { nickname }= res.locals.user
        const { postId } = req.params; 
        const { title, content } = req.body;
        const updatePostdata = await this.postService.updatepost(postId, title, content);
        if (updatePostdata.errorMessage) {
            res.status(400).json(updatePostdata);
            return
        }
        res.status(201).json({ data: updatePostdata })

    }catch(err){
        console.log(err);
        res.status(400).send({
        errorMessage: "요청한 데이터 형식이 알맞지 않습니다.",
        })
    }}

    
//게시글 삭제
  deletePost = async (req, res, next) => {
    // try{
        const { nickname }= res.locals.user
        const { postId } = req.params;
        const deletePostdata = await this.postService.deletePost(postId, nickname);
        if (deletePostdata.errorMessage) {
            res.status(400).json(deletePostdata);
            return
        }
        res.status(200).json(deletePostdata)
    // }catch(err){
    //     console.log(err);
    //     res.status(400).send({
    //     errorMessage: "요청한 데이터 형식이 알맞지 않습니다.",
    //     })
   
  }

}



module.exports = PostsController;