import { createAction } from "@reduxjs/toolkit";

export const apiRequest = createAction("apiRequest");
export const apiRequestSuccess = createAction("apiRequestSuccess");
export const apiRequestFail = createAction("apiRequestFail");
