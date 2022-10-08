class RegisteredThread{
    constructor(payload){
        this._verifyPayload(payload)
        const {id, ownerId, body, title} = payload
        this.id = id
        this.ownerId = ownerId
        this.body = body
        this.title = title
    }
    _verifyPayload({id, ownerId, title, body}){
        if (!id || !ownerId || !title || !body) {
            throw new Error('REGISTERED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof id !== 'string' ||typeof body !== 'string' || typeof title !== 'string' || typeof ownerId !== 'string') {
            throw new Error('REGISTERED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}
module.exports = RegisteredThread