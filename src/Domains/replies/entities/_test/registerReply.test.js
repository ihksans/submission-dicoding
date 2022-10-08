const RegisterReply = require('../RegisterReply')
describe('a Register Reply entities', ()=>{
    it('should throw error when payload did not contain needed property', ()=>{
        // Arrange
        const payload = { }
        // Action and Assert
        expect(()=> new RegisterReply(payload)).toThrowError("REGISTER_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION")
    }),
    it('should throw error when payload did not meet data type specification', ()=>{
        // Arrange
        const payload = {
            content: 1222,
        }
        // Action
        expect(()=> new RegisterReply(payload)).toThrowError("REGISTER_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION")
    }),
    it('should throw error when payload did not meet data type with regex', () =>{
        // Arrange
        const payload = {
            content: 'sample content  ">">?"}|++_',
          }
        // Assert
        expect(() => new RegisterReply(payload)).toThrowError("REGISTER_REPLY.TITLE_CONTAIN_RESTRICTED_CHARACTER")
    }),
    it('should throw error when content out of limit characthers', () =>{
        // Arrange
        const payload = {
            content: 'sample content sample content content content content content sample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content contentsample content sample content content content content content',
          }
        // Assert
        expect(() => new RegisterReply(payload)).toThrowError("REGISTER_REPLY.LIMIT_MAX_CHARACTHERS")
    }),
    it('should create reply object correctly', () => {
      // Arrange
      const payload = {
        content: "content"
      }
      // Action
      const { content } = new RegisterReply(payload)
      // Assert
      expect(content).toEqual(payload.content)
    })
})