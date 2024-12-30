export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public provider?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown): string {
  if (error instanceof ApiError) {
    return `API Error (${error.provider}): ${error.message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}