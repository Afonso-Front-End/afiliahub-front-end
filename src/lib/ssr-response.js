export function isSwallowedSsrError(body) {
    return body.includes('"unhandled":true') && body.includes('"message":"HTTPError"');
}
