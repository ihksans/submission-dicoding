const routes = (handler) => [
    {
        method: 'POST',
        path: '/threads/{threadId}/comments/{commentId}/replies',
        handler: handler.postAddReplyHandler,
        options: {
          auth: 'thread_jwt',
        },
    },
    {
      method: 'DELETE',
      path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
      handler: handler.deleteReplyHandler,
      options: {
        auth: 'thread_jwt',
    }
  }
]

module.exports = routes