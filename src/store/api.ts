import { ActionCreatorWithPayload, createAction } from "@reduxjs/toolkit";
import { ApiRequestPayload } from "../global/models/common/common";

export const apiRequest: ActionCreatorWithPayload<ApiRequestPayload> =
  createAction("apiRequest");
export const apiRequestSuccess = createAction("apiRequestSuccess");
export const apiRequestFail = createAction(
  "apiRequestFail",
  (error: string) => ({
    payload: error,
  })
);
