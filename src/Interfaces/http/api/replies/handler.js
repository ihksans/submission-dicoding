const AddReplyUseCase = require("../../../../Applications/use_case/AddReplyUseCase")
const DeleteCommentUseCase = require("../../../../Applications/use_case/DeleteCommentUseCase")
const DeleteReplyUseCase = require("../../../../Applications/use_case/DeleteReplyUseCase")

class ReplyHandler{
    constructor(container){
        this._container = container
        this.postAddReplyHandler = this.postAddReplyHandler.bind(this)
        this.deleteReplyHandler = this.deleteReplyHandler.bind(this)
    }
    async postAddReplyHandler(request, h){
        const addReplyUseCase = this._container.getInstance(AddReplyUseCase.name)
        const { id } = request.auth.credentials
        const { threadId } = request.params
        const { commentId } = request.params
        const { content } = request.payload
        const addedReply = await addReplyUseCase.execute(content, id, commentId, threadId)
        const response = h.response({
                status: 'success',
                data: {
                    addedReply
                }
            })
        response.code(201)
        return response
    }
    async deleteReplyHandler(request, h){
        const deleteCommentUseCase = this._container.getInstance(DeleteReplyUseCase.name)
        const { id } = request.auth.credentials
        const { threadId, commentId, replyId } = request.params
        console.log("request1: " ,{id, threadId, commentId, replyId})
        const deletedComment = await deleteCommentUseCase.execute(id, replyId, commentId, threadId )
        const response = h.response({
                status: 'success',
                data: {
                    deletedComment
                }
            })
        response.code(200)
        return response
    }
}
module.exports = ReplyHandler