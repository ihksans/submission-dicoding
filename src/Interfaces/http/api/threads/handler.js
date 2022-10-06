const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase')
const GetThreadDetailUseCase = require('../../../../Applications/use_case/GetThreadDetailUseCase')

class ThreadsHandler{
    constructor(container){
        this._container = container
        this.postThreadHandler = this.postThreadHandler.bind(this)
        this.getsThreadHandler = this.getsThreadHandler.bind(this)
    }
    async postThreadHandler(request, h){
        const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name)
        const { id } = request.auth.credentials
        const addedThread = await addThreadUseCase.execute(request.payload, id)

        const response = h.response({
            status: 'success',
            data: {
                addedThread
            }
        })
        response.code(201)
        return response
    }
    async getsThreadHandler(request, h){
        const getThreadUseCase = this._container.getInstance(GetThreadDetailUseCase.name)
        const { threadId } = request.params
        const thread = await getThreadUseCase.execute(threadId)

        const response = h.response({
            status: 'success',
            data: {
                thread
            }
        })
        response.code(200)
        return response
    }
}
module.exports = ThreadsHandler