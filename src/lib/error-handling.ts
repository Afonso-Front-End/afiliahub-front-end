export function isHttpLikeError(error: unknown) {
  return error != null && typeof error === "object" && "statusCode" in error;
}

export function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}
