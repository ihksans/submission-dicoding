const routes = (handler) => ([
    {
        method: 'POST',
        path: '/threads',
        handler: handler.postThreadHandler,
        options: {
            auth: 'thread_jwt'
        }
    },
    {
        method: 'GET',
        path: '/threads/{threadId}',
        handler: handler.getsThreadHandler,
        options: {
            auth: 'thread_jwt'
        }
    }
])

module.exports = routes