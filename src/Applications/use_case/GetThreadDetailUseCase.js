class GetThreadDetailUseCase {
    constructor({
        commentRepository, threadRepository, replyRepository
    }){
        this._commentRepository = commentRepository
        this._threadRepository = threadRepository
        this._replyRepository = replyRepository
        this._getReplies = this._getReplies.bind(this)
    }
    async execute(id){
        try {
            const thread = await this._threadRepository.getThreadDetail(id)
            let comments = await this._commentRepository.getComments(id)
               for(var comment of comments){
                const replies = await this._getReplies(comment.id, this._replyRepository)
                    comment.replies = replies
               }
            thread.comments = comments
            return thread
        } catch (error) {
            console.log(error)
        }
    }
    async _getReplies(id, _replyRepository){
        const replies =  await _replyRepository.getReplies(id)
        return replies
    }
}
module.exports = GetThreadDetailUseCase
