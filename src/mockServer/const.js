export const STATUS_CODES = {
  success: '200',
  createdSuccess: '201',
  badRequest: '400',
  notFound: '404',
  unauthorized: '401',
  internalServerError: '500',
}

export const httpError = {
  400: {
    error: {
      code: 400,
      message: 'Bad Request',
    },
  },
  401: {
    error: {
      code: 401,
      message: 'Unauthorized',
    },
  },
  404: {
    error: {
      code: 404,
      message: 'Not Found',
    },
  },
  500: {
    error: {
      code: 500,
      message: 'Internal Server Error',
    },
  },
}
