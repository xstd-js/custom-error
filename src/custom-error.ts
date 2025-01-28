export interface CustomErrorOptions extends Readonly<ErrorOptions> {
  readonly message?: string;
}

/**
 * A Custom Error with a specific name.
 */
export class CustomError<GName extends string = string> extends Error {
  readonly name: GName;

  constructor(name: GName, { message, ...options }: CustomErrorOptions = {}) {
    super(message, options);
    this.name = name;
  }
}
