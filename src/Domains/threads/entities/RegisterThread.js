class RegisterThread{
    constructor(payload){
        this._verifyPayload(payload)
        const { ownerId, title, body} = payload
        this.ownerId = ownerId
        this.title = title
        this.body = body
    }
    _verifyPayload({ ownerId, title, body}){
        if (typeof body !== 'string' || typeof title !== 'string' || typeof ownerId !== 'string') {
            throw new Error('REGISTER_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
        if(title.length > 255 || body.length > 255){
            throw new Error("REGISTER_THREAD.LIMIT_MAX_CHARACTHERS")
        }
        if (!title.match(/^[\w\s\d]*$/) || !body.match(/^[\w\s\d]*$/)) {
            throw new Error('REGISTER_THREAD.TITLE_CONTAIN_RESTRICTED_CHARACTER')
        }
    }
}
module.exports = RegisterThread