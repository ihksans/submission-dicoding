const RegisteredReply = require('../../../replies/entities/RegisteredReply')

describe('a Registered Reply', ()=>{
    it('should error with wrong payload request', ()=>{
    // Arrange
    const payload = {
        content: '123123'
    }

    // Action and Assert
    expect(()=> new RegisteredReply(payload)).toThrowError('REGISTERED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY')
    }),
    it('should create reply object correctly', ()=>{
        // Arrange
        const payload = {
            id: 'reply-123',
            ownerid: 'user-123',
            content: 'comment',
            commentid: 'comment-123'
        }
        // Action
        const {id, ownerid, commentid, content} = new RegisteredReply(payload)

        // Assert
        expect(id).toEqual(payload.id)
        expect(ownerid).toEqual(payload.ownerid)
        expect(commentid).toEqual(payload.commentid)
        expect(content).toEqual(payload.content)
    }),
    it('should throw error when payload did not meet data type specification', ()=>{
        const payload = {
            id: 123123,
            ownerid: 123123,
            content: 123123,
            commentid: 123123
        }

        expect(()=> new RegisteredReply(payload)).toThrowError('REGISTERED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION')
    })
})