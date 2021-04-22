module.exports = {
    ...jest.requireActual('..'),
    _esMModule: true,
    // TODO: updated return value for Redux / context implementation
    getSecretWord: jest.fn().mockReturnValue(Promise.resolve('party')),
}