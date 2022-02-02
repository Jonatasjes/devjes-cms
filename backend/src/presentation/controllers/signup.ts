export class SignupController {
  handle(httpRequest: any): any {
    if (!httpRequest.body.first_name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: first_name')
      }
    }

    if (!httpRequest.body.last_name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: last_name')
      }
    }
  }
}
