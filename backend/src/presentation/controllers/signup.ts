export class SignupController {
  handle(httpRequest: any): any {
    return {
      statusCode: 400,
      body: new Error('Missing param: first_name')
    }
  }
}
