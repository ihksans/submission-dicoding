class RegisteredReply{
    constructor(payload){
        this._verifyPayload(payload)
        const {id, ownerid, content, commentid} = payload
        this.id = id
        this.ownerid = ownerid
        this.content = content
        this.commentid = commentid
    }
    _verifyPayload({id, ownerid, content, commentid}){
        if (!id || !ownerid || !commentid || !content) {
            throw new Error('REGISTERED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof id !== 'string' || typeof ownerid !== 'string' || typeof content !== 'string'|| typeof commentid !== 'string') {
            throw new Error('REGISTERED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}
module.exports = RegisteredReply