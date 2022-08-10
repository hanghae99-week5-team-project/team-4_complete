
const auth_middlewares = require("./auth_middlewares");

jest.mock("../models")
const { Member } = require("../models")

test("토큰으로 유저 확인 작업", () => {
    auth_middlewares({
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcml2YXRla2V5Ijo4LCJpYXQiOjE2NTk1NzQ0MTh9.Qf1yHaobTIFINgkFel_ulCAwaBnR2IytQA_tUrDniE0",  
        }
    }, {
        status: () => ({
            send: () => {},
        }),
        locals: {}
    })
    expect(Member.findByPk).toHaveBeenCalled(); //findByPK가 실행되었는지 확인
    expect(Member.findByPk).toHaveBeenCalledTimes(1)//findByPK가 몇번 실행되엇는지 확인
})

test("토큰이 없을때 유저 확인 작업", () => {
    auth_middlewares({
        headers: {
            authorization: " ",  
        }
    }, {
        status: () => ({
            send: () => {},
        }),
        locals: {}
    })
})