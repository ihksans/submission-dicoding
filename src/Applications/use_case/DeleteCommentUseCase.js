class DeleteCommentUseCase {
    constructor({
        commentRepository, threadRepository
    }){
        this._commentRepository = commentRepository
        this._threadRepository = threadRepository
    }
    async execute(ownerId, threadId, commentId){
        await this._commentRepository.getComment({id: commentId})
        await this._threadRepository.getThread(threadId)
        return this._commentRepository.deleteComment({id: commentId, ownerId: ownerId})
    }
}
module.exports = DeleteCommentUseCase
