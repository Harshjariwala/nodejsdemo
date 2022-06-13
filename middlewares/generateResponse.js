exports.sendJson = function sendJson (statusCode = 200, response = null) {
  const status = statusCode >= 200 && statusCode < 300;

  if (!(typeof response == "object" && response.message && response.data)){
    response = (typeof response == "string") ? { status, message : response }: { status, data: response};
  }
  return this.status(statusCode).json(response);
}