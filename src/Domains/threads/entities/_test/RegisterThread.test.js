const RegisterThread = require('../RegisterThread')
describe('a RegisterThread entities', ()=>{
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
          body: 'asdasdasd',
        }
        // Action and Assert
        expect(()=> new RegisterThread(payload)).toThrowError("REGISTER_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION")
    }),
    it('should throw error when payload did not meet data type specification', ()=>{
      // Arrange
      const payload = {
        body: 123,
        title: 123,
        ownerId: 123,
      }
      // Action and Assert
      expect(()=> new RegisterThread(payload)).toThrowError("REGISTER_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION")
    }),
    it('should throw error when payload did not meet data type with regex', () =>{
    // Arrange
    const payload = {
        ownerId: 'asdasdasdasdasd',
        title: 'sample thread ">">?"}|++_',
        body: 'sample body',
      }
    // Assert
    expect(() => new RegisterThread(payload)).toThrowError("REGISTER_THREAD.TITLE_CONTAIN_RESTRICTED_CHARACTER")
    }),
    it('should throw error when title contains more than limit character', () => {
        // Arrange
        const payload = {
            ownerId: 'asdasdasdasdasd',
            title: 'samplethredaaaaaaaaaasamplethredaaaaaaaaaasamplethredaaaaaaaaaasamplethredaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasampleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaathredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasampleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaathredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasampleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaathredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasampleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaathredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasampleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaathredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasampleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaathredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasampleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaathredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaa',
            body: 'sample',
          }
        // Action and Assert
        expect(() => new RegisterThread(payload)).toThrowError("REGISTER_THREAD.LIMIT_MAX_CHARACTHERS")
    }),
    it('should throw error when body contains more than limit character', ()=>{
       // Arrange
       const payload = {
        ownerId: 'asdasdasdasdasd',
        title: 'aaa',
        body: 'samplethredaaaaaaaaaasamplethredaaaaaaaaaasamplethredaaaaaaaaaasamplethredaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasampleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaathredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasampleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaathredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasampleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaathredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasampleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaathredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasampleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaathredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasampleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaathredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasampleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaathredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaasamplethredaaaaaaaaaaaaaaaaaaaaaaaaaa',
      }
    // Action and Assert
    expect(() => new RegisterThread(payload)).toThrowError("REGISTER_THREAD.LIMIT_MAX_CHARACTHERS")
    }),
    it('should create thread object correctly', () => {
      // Arrange
      const payload = {
        ownerId: 'asdasdasdasdasd',
        title: 'dicoding',
        body: 'dicoding',
      }
      // Action
      const { ownerId, title, body } = new RegisterThread(payload)
      // Assert
      expect(ownerId).toEqual(payload.ownerId)
      expect(title).toEqual(payload.title)
      expect(body).toEqual(payload.body)
    })
})