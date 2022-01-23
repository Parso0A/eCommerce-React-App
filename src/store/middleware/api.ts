import axios, { AxiosRequestConfig } from "axios";
import * as apiActions from "../../store/api";
import * as env from "../../config";
import { isAuthenticated } from "../../services/auth/authService";

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiActions.apiRequest.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      const requestConfig: AxiosRequestConfig = {
        baseURL: env.API,
        url,
        method,
        data,
      };

      if (isAuthenticated()?.token ?? false) {
        requestConfig.headers = {
          Authorization: `Bearer ${isAuthenticated()!.token}`,
        };
      }

      const response = await axios.request(requestConfig);

      dispatch({ type: onSuccess, payload: response.data });
    } catch (error: any) {
      dispatch(apiActions.apiRequestFail(error.message));

      if (onError) {
        dispatch({ type: onError, payload: error.message });
      }
    }
  };

export default api;
