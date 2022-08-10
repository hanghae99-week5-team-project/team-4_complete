
const PostService = require("./posts.service");
// const PostRepository = require('../repositories/posts.repository');


jest.mock("../models")
const { Post } = require("../models");
// const UserRepository = require("../repositories/users.repository");

test("게시글 전체조회", async () => {
  const postService = new PostService()
  postService.postRepository.findAllPost = jest.fn(()=>
  
    [{id: 1,
    title: "title1",
    nickname: "nick1",
    content: "content1",
    Like: 1,
    createdAt: "2022-08-02T15:03:26.000Z",
    updatedAt: "2022-08-05T08:43:20.000Z",
  },
  {
    id: 2,
    title: "title2",
    nickname: "nick2",
    content: "content2",
    Like: 1,
    createdAt: "2022-08-02T15:03:26.000Z",
    updatedAt: "2022-08-05T08:43:20.000Z",
}]
 )
  expect(await postService.findAllPost()).toEqual([{
      postId: 1,
      title: "title1",
      nickname: "nick1",
      content: "content1",
      Like: 1,
      createdAt: "2022-08-02T15:03:26.000Z",
      updatedAt: "2022-08-05T08:43:20.000Z",
    },
    {
      postId: 2,
      title: "title2",
      nickname: "nick2",
      content: "content2",
      Like: 1,
      createdAt: "2022-08-02T15:03:26.000Z",
      updatedAt: "2022-08-05T08:43:20.000Z",
  }])

  }),

describe("Post", () => {
 const postService = new PostService()

  test("글작성 제목 없을 시 에러메세지 표시", async () => {
    postService.postRepository.createPost = jest.fn(() =>{
      
    })  
    
    expect(await postService.createPost("닉네임","","내용")).toEqual({ errorMessage: '제목 및 내용을 작성 해주세요.' })
  
  }),

  test("글작성 내용 없을 시 에러메세지 표시", async () => {
    postService.postRepository.createPost = jest.fn(() =>({
      "nickname" : "닉네임",
      "title" : "제목",
      "content" : "내용"
    }))  
    expect(await postService.createPost("닉네임","제목","")).toEqual({ errorMessage: '제목 및 내용을 작성 해주세요.' })
  }),
  test("글작성 내용 없을 시 에러메세지 표시", async () => {
    postService.postRepository.createPost = jest.fn(() =>({
      "nickname" : "닉네임",
      "title" : "제목",
      "content" : "내용"
    }))  
    expect(await postService.createPost("닉네임","제목","내용")).toEqual({                                                                                                                                                                                                                          
      postId: undefined,                                                                                                                                                                                                       
      nickname: '닉네임',                                                                                                                                                                                                      
      title: '제목',                                                                                                                                                                                                           
      Like: undefined,
      content: '내용',
      createdAt: undefined,
      updatedAt: undefined
    })
  })
})

test("게시글 선택조회", async () => {
  const postService = new PostService()
  postService.postRepository.findPost = jest.fn(()=>({
    "id" : "ID"
  }))
  expect(await postService.findPost("postId")).toEqual({
    postId: "ID" ,                                                                                                                                                                                                     
    nickname: undefined,                                                                                                                                                                                                    
    title: undefined,                                                                                                                                                                                                          
    Like: undefined,
    content: undefined,
    createdAt: undefined,
    updatedAt: undefined
  })
})

describe("Post", () => {
  const postService = new PostService()

  test("게시글 업데이트", async () => {
    postService.postRepository.updatePost = jest.fn(()=>({
      "id" : "ID",
      "title": "제목",
      "content": "내용"
    }))
    expect(await postService.updatepost("postId","postId","content")).toEqual({
      postId: "ID" ,                                                                                                                                                                                                     
      nickname: undefined,                                                                                                                                                                                                    
      title: "제목",                                                                                                                                                                                                          
      Like: undefined,
      content: "내용",
      createdAt: undefined,
      updatedAt: undefined
    })
  }),

  test("게시글 업데이트 제목 내용 미기입", async () => {
    postService.postRepository.updatePost = jest.fn(()=>({
      "id" : "ID",
      "title": "제목",
      "content": "내용"
    }))
    expect(await postService.updatepost("postId","","content")).toEqual({
      "errorMessage": "제목 및 내용을 작성 해주세요."
    })
  })

})
describe("Post", () => {
  const postService = new PostService()

  test("게시글 삭제 ", async () => {
    postService.postRepository.findPost = jest.fn(()=>({
      "id" : "postId",
      "nickname" : "nickname" 
    }))
    expect(await postService.deletePost("postId","nickname")).toEqual({
      "Message": "게시글이 삭제 되었습니다."
    })
  })
  

  test("게시글 삭제 본인 인증 실패 ", async () => {
    postService.postRepository.findPost = jest.fn(()=>({
      "id" : "postId",
      "nickname" : "" 
    }))
    expect(await postService.deletePost("postId","nickname")).toEqual({
      "errorMessage": "본인글만 삭제할 수 있습니다."
    })
  })
})  

