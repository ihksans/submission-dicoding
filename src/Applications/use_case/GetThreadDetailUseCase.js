class GetThreadDetailUseCase {
    constructor({
        commentRepository, threadRepository
    }){
        this._commentRepository = commentRepository
        this._threadRepository = threadRepository
    }
    async execute(id){
        const thread = await this._threadRepository.getThreadDetail(id)
        const comments = await this._commentRepository.getComments(id)
        thread.comments = comments
        return thread
    }
}
module.exports = GetThreadDetailUseCase
