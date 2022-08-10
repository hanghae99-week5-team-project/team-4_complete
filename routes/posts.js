// routes/posts.js
const express = require('express');
const { Post } = require("../models");
const router = express.Router();
const authMiddleware = require("../middlewares/auth_middlewares")
// const { Op } = require("sequelize");

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

// 게시글 작성 레이어드아키텍처

router.post('/', authMiddleware, postsController.createPost);
router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getPost);
router.put('/:postId', authMiddleware, postsController.updatePost);
router.delete("/:postId", authMiddleware, postsController.deletePost);
 


// // 게시글 작성
// router.post("/", authMiddleware, async (req, res) => {   
//     const { nickname }= res.locals.user

//     const { title, content } = req.body;
//     if(!title || !content){
//         res.send({message : "제목 및 내용을 작성 해주세요."});
//     }
//     else if(nickname){
//         Post.create({ nickname, title, content })
//         res.status(201).send({message : "게시글을 생성하였습니다."});
//     }else{
//         res.status(400).send({errorMessage: "로그인을 해주세요"})
//     }
    
// });



// 전체 게시글 조회
// router.get("/", async (req, res) => {  
//     const posts = await (await Post.findAll()).reverse()
//     res.json({ 
//         data : posts.map((posts) =>({
//             nickname : posts.nickname,
//             title : posts.title,
//             content : posts.content,
//             createdAt : posts.createdAt,
//             updatedAt : posts.updatedAt,
//             Like : posts.Like
//         })) 
//     })
// })

//게시글 상세조회
// router.get("/:postId", async (req, res) => {
//     const { postId } = req.params; 
//     const post = await Post.findOne({ where: { id: postId } })
//     res.json({
//         data :{
//             nickname : post.nickname,
//             title : post.title,
//             content : post.content,
//             Like : post.Like,
//             createdAt : post.createdAt,
//             updatedAt : post.updatedAt
//         }
//     })
// })

// //게시글 수정  
// router.put("/:postId", authMiddleware, async (req, res) => {
//     const { nickname }= res.locals.user
//     const { title, content } = req.body;
//     const { postId } = req.params; 
//     const post = await Post.findOne({where: {id: postId}})
//     if (!nickname){
//         res.status(400).send({errorMessage: "로그인을 해주세요"})
//     }
//     else if  (nickname === post.nickname){
//         await post.update({
//             content : content,
//             title : title
//         })
//         res.json({ message : "게시글을 수정하였습니다." })
//     }else{
//         res.json({ errorMessage: "본인글만 수정할 수 있습니다.."})
//     }    
// })

// //게시글 삭제
// router.delete("/:postId", authMiddleware, async (req, res) =>{
//     const { nickname }= res.locals.user
//     const { postId } = req.params;
//     const post = await Post.findOne({where: {id: postId}})
//     if (!nickname){
//         res.status(400).send({errorMessage: "로그인을 해주세요"})
//     }
//     else if (nickname === post.nickname){
//         await post.destroy()
//         res.json({ message : "게시글을 삭제하였습니다."})
//     }else{
//         res.json({ errorMessage: "본인글만 삭제할 수 있습니다."})
//     }
    
// })







module.exports = router;