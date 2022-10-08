class DeleteReplyUseCase {
    constructor({
        commentRepository, threadRepository, replyRepository
    }){
        this._commentRepository = commentRepository
        this._threadRepository = threadRepository
        this._replyRepository = replyRepository
    }
    async execute(id, replyid, commentid, threadid){
        console.log("area 1")
        await this._threadRepository.getThread(threadid)
        console.log("area 2")
        await this._commentRepository.getComment({id: commentid})
        console.log("area 3")
        await this._replyRepository.getReply({id: replyid})
        console.log("area 4")
        return this._replyRepository.deleteReply({id: replyid, ownerId: id})
    }
}
module.exports = DeleteReplyUseCase
