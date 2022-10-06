class RegisteredComment{
    constructor(payload){
        this._verifyPayload(payload)
        const {id, ownerid, content, threadid} = payload
        this.id = id
        this.ownerid = ownerid
        this.content = content
        this.threadid = threadid
    }
    _verifyPayload({id, ownerid, content, threadid}){
        if (!id || !ownerid || !threadid || !content) {
            throw new Error('REGISTERED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof id !== 'string' || typeof ownerid !== 'string' || typeof content !== 'string'|| typeof threadid !== 'string') {
            throw new Error('REGISTERED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}
module.exports = RegisteredComment