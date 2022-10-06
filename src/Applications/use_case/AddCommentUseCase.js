const RegisterComment = require('../../Domains/comments/entities/RegisterComment')

class AddCommentUseCase {
    constructor({
        commentRepository, threadRepository
    }){
        this._commentRepository = commentRepository
        this._threadRepository = threadRepository
    }

    async execute(payload, id, threadid){
        const registerComment = new RegisterComment({content: payload})
        await this._threadRepository.getThread(threadid)
        return this._commentRepository.addComment({content: registerComment.content, ownerid: id, threadid: threadid})
    }
}
module.exports = AddCommentUseCase