[![npm (scoped)](https://img.shields.io/npm/v/@xstd/custom-error.svg)](https://www.npmjs.com/package/@xstd/custom-error)
![npm](https://img.shields.io/npm/dm/@xstd/custom-error.svg)
![NPM](https://img.shields.io/npm/l/@xstd/custom-error.svg)
![npm type definitions](https://img.shields.io/npm/types/@xstd/custom-error.svg)

<picture>
  <source height="64" media="(prefers-color-scheme: dark)" srcset="https://github.com/xstd-js/website/blob/main/assets/logo/png/logo-large-dark.png?raw=true">
  <source height="64" media="(prefers-color-scheme: light)" srcset="https://github.com/xstd-js/website/blob/main/assets/logo/png/logo-large-light.png?raw=true">
  <img height="64" alt="Shows a black logo in light color mode and a white one in dark color mode." src="https://github.com/xstd-js/website/blob/main/assets/logo/png/logo-large-light.png?raw=true">
</picture>

## @xstd/custom-error

Custom error implementation.

## 📦 Installation

```shell
yarn add @xstd/custom-error
# or
npm install @xstd/custom-error --save
```

## 📜 Documentation

### CustomError

```ts
interface CustomErrorOptions extends Readonly<ErrorOptions> {
  readonly message?: string;
}

/**
 * A Custom Error with a specific name.
 */
declare class CustomError<GName extends string = string> extends Error {
  readonly name: GName;

  constructor(name: GName, options?: CustomErrorOptions);
}
```
