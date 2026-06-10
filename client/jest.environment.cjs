const { TestEnvironment } = require("jest-environment-jsdom");
const { TextDecoder, TextEncoder } = require("node:util");
const {
  ReadableStream,
  TransformStream,
  WritableStream,
} = require("node:stream/web");

const nodeWebApis = {
  Blob: globalThis.Blob,
  BroadcastChannel: globalThis.BroadcastChannel,
  File: globalThis.File,
  FormData: globalThis.FormData,
  Headers: globalThis.Headers,
  Request: globalThis.Request,
  Response: globalThis.Response,
  fetch: globalThis.fetch,
};

class JSDOMEnvironment extends TestEnvironment {
  async setup() {
    await super.setup();

    Object.assign(this.global, {
      ...nodeWebApis,
      ReadableStream,
      TextDecoder,
      TextEncoder,
      TransformStream,
      WritableStream,
    });
  }
}

module.exports = JSDOMEnvironment;
