export function isHttpLikeError(error) {
    return error != null && typeof error === "object" && "statusCode" in error;
}
export function getErrorMessage(error, fallback) {
    return error instanceof Error ? error.message : fallback;
}
