class RegisteredComment{
    constructor(payload){
        this._verifyPayload(payload)
        const {id, ownerId, content, threadId} = payload
        this.id = id
        this.ownerId = ownerId
        this.content = content
        this.threadId = threadId
    }
    _verifyPayload({id, ownerId, content, threadId}){
        if (!id || !ownerId || !threadId || !content) {
            throw new Error('REGISTERED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
        }
        if (typeof id !== 'string' || typeof ownerId !== 'string' || typeof content !== 'string'|| typeof threadId !== 'string') {
            throw new Error('REGISTERED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
    }
}
module.exports = RegisteredComment