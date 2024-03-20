export default class NullishError extends TypeError {
  constructor() {
    super('Value is null or undefined');
  }
}
