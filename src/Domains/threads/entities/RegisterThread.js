class RegisterThread{
    constructor(payload){
        this._verifyPayload(payload)
        const { ownerid, title, body} = payload
        this.ownerid = ownerid
        this.title = title
        this.body = body
    }

    _verifyPayload({ ownerid, title, body}){
        if (typeof body !== 'string' || typeof title !== 'string' || typeof ownerid !== 'string') {
            throw new Error('REGISTER_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
        if(title.length > 255 || body.length > 255){
            throw new Error("REGISTER_THREAD.LIMIT_MAX_CHARACTHERS")
        }
        if (!title.match(/^[\w\s\d]*$/) || !body.match(/^[\w\s\d]*$/)) {
            throw new Error('REGISTER_THREAD.TITLE_CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}
module.exports = RegisterThread