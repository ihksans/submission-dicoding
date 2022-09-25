class RegisteredThread{
    constructor(payload){
        this._verifyPayload(payload)
        const {id, ownerid, body, title} = payload
        this.id = id
        this.ownerid = ownerid
        this.body = body
        this.title = title
    }

    _verifyPayload({id, ownerid, title, body}){
        if (!id || !ownerid || !title || !body) {
            throw new Error('REGISTERED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof id !== 'string' ||typeof body !== 'string' || typeof title !== 'string' || typeof ownerid !== 'string') {
            throw new Error('REGISTERED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}
module.exports = RegisteredThread