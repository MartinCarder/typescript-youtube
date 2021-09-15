import {
  createAction,
  PayloadActionCreator,
  PrepareAction,
} from "@reduxjs/toolkit";

function withPayloadType<T>() {
  return (payload: T) => ({ payload });
}

export type AsyncActions<
  RequestPayload = void,
  SuccessPayload = void,
  FailedPayload = void
> = {
  request: PayloadActionCreator<
    RequestPayload,
    string,
    PrepareAction<RequestPayload>
  >;
  success: PayloadActionCreator<
    SuccessPayload,
    string,
    PrepareAction<SuccessPayload>
  >;
  failed: PayloadActionCreator<
    FailedPayload,
    string,
    PrepareAction<FailedPayload>
  >;
};

export function createAsyncActions<
  RequestPayload = void,
  SuccessPayload = void,
  FailedPayload = void
>(type: string) {
  return {
    request: createAction(`${type}/request`, withPayloadType<RequestPayload>()),
    success: createAction(`${type}/success`, withPayloadType<SuccessPayload>()),
    failed: createAction(`${type}/failed`, withPayloadType<FailedPayload>()),
  };
}
