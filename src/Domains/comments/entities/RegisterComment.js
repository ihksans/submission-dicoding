class RegisterComment{
    constructor(payload){
        this._verifyPayload(payload)
        const {content} = payload
        this.content = content
    }
    _verifyPayload({content}){
        if (typeof content !== 'string') {
            throw new Error('REGISTER_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
        if(content.length > 50){
            throw new Error("REGISTER_COMMENT.LIMIT_MAX_CHARACTHERS")
        }
        if (!content.match(/^[\w\s\d]*$/)) {
            throw new Error('REGISTER_COMMENT.TITLE_CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}
module.exports = RegisterComment