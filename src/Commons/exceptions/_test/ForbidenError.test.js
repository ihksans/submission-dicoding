const ForbiddenError = require('../ForbiddenError')
const ClientError = require('../ClientError')

describe('ForbiddenError', () => {
  it('should create error correctly', () => {
    const forbiddenError = new ForbiddenError('forbidden!');

    expect(forbiddenError).toBeInstanceOf(ForbiddenError);
    expect(forbiddenError).toBeInstanceOf(ClientError);
    expect(forbiddenError).toBeInstanceOf(Error);

    expect(forbiddenError.message).toEqual('forbidden!');
    expect(forbiddenError.statusCode).toEqual(403);
    expect(forbiddenError.name).toEqual('ForbiddenError');
  });
});
