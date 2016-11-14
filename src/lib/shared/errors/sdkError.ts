export class SdkError extends Error {
  error;

  constructor (error) {
    let message = error.error_user_msg || error.message || 'Unknown Facebook Javascript Sdk Error occured';

    super(message);

    this.message = error.error_user_msg || error.message || 'Unknown Facebook Javascript Sdk Error occured';
    this.error   = error;
    this.name    = 'SdkError';
  }
}
