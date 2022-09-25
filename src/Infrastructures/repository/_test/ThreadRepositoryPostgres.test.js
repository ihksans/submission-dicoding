const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const RegisterThread = require('../../../Domains/threads/entities/RegisterThread')
const RegisteredThread = require('../../../Domains/threads/entities/RegisteredThread')
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostres = require('../ThreadRepositoryPostgres')

describe('ThreadRepositoryPostgres', ()=>{
    afterEach(async ()=>{
        await ThreadTableTestHelper.cleanTable()
        await UsersTableTestHelper.cleanTable()
    })
    afterAll(async ()=>{
        await pool.end
    })
    describe('addThread function', () =>{
        it('should persist register thread and return registered thread correctly', async()=>{
           // Arrange
           const registerThread = new RegisterThread({
                title: 'title thread',
                body: 'body thread',
                ownerid: 'user-111'
           })
           const fakeIdGenerator = () => '123'
           const threadRepositoryPostgres = new ThreadRepositoryPostres(pool, fakeIdGenerator)
           
           // stub
           const userId = await UsersTableTestHelper.addUserWithReturnId();
           
           // Action 
           registerThread.ownerid = userId
           await threadRepositoryPostgres.addThread(registerThread)
           
           // Assert
           const threads = await ThreadTableTestHelper.findThreadById('thread-123')
           expect(threads).toHaveLength(1)
        }),
        it('should correct get thread detail by thread id', async ()=>{
            // Arrange
           const registerThread = ({
                id: 'thread-555',
                title: 'title thread',
                body: 'body thread',
                ownerid: 'user-111'
            })
            
            // stub
            const userId = await UsersTableTestHelper.addUserWithReturnId();
            const threadRepositoryPostgres = new ThreadRepositoryPostres(pool, {});
            
            // Action 
            registerThread.ownerid = userId
            
            // Assert
            await ThreadTableTestHelper.addThread(registerThread)
            const thread = await threadRepositoryPostgres.getThread(registerThread.id);
            expect(thread.title).toEqual(registerThread.title);
            expect(thread.body).toEqual(registerThread.body);
            expect(thread.ownerid).toEqual(registerThread.ownerid);
        }),
        it('should error when thread id not found', async ()=>{
            // Arrange
             const threadRepositoryPostgres = new ThreadRepositoryPostres(pool, {});

            // Action & Assert
            await expect(threadRepositoryPostgres.getThread('asdasd'))
                .rejects
                .toThrowError(InvariantError);
        })
    })
})
