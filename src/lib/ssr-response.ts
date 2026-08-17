export function isSwallowedSsrError(body: string) {
  return body.includes('"unhandled":true') && body.includes('"message":"HTTPError"');
}
