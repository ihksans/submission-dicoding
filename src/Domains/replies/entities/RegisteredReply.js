class RegisteredReply{
    constructor(payload){
        this._verifyPayload(payload)
        const {id, ownerId, content, commentId} = payload
        this.id = id
        this.ownerId = ownerId
        this.content = content
        this.commentId = commentId
    }
    _verifyPayload({id, ownerId, content, commentId}){
        if (!id || !ownerId || !commentId || !content) {
            throw new Error('REGISTERED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof id !== 'string' || typeof ownerId !== 'string' || typeof content !== 'string'|| typeof commentId !== 'string') {
            throw new Error('REGISTERED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}
module.exports = RegisteredReply