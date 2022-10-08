class DeleteReplyUseCase {
    constructor({
        commentRepository, threadRepository, replyRepository
    }){
        this._commentRepository = commentRepository
        this._threadRepository = threadRepository
        this._replyRepository = replyRepository
    }
    async execute(id, replyId, commentId, threadId){
        await this._threadRepository.getThread(threadId)
        await this._commentRepository.getComment(commentId)
        await this._replyRepository.getReply(replyId)
        return this._replyRepository.deleteReply(replyId, id)
    }
}
module.exports = DeleteReplyUseCase
