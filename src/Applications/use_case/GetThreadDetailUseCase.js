class GetThreadDetailUseCase {
    constructor({
        commentRepository, threadRepository, replyRepository
    }){
        this._commentRepository = commentRepository
        this._threadRepository = threadRepository
        this._replyRepository = replyRepository
    }
    async execute(id){
        const thread = await this._threadRepository.getThreadDetail(id)
            let comments = await this._commentRepository.getComments(id)
            if(comments.length > 0){
                for(var comment of comments){
                    const replies = await this._getReplies(comment.id, this._replyRepository)
                        comment.replies = replies
                   }
            }
            thread.comments = comments
            return thread
    }
    async _getReplies(id, _replyRepository){
        const replies =  await _replyRepository.getReplies(id)
        return replies
    }
}
module.exports = GetThreadDetailUseCase
