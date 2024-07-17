import axios, {AxiosError} from 'axios';
import {AppConstants, StoreConstantValues} from '@constants';
import {isNull, showErrorDialog, printConsole} from '@utils';

let timeout = 60000;
let noNetworkObj = {
  status: 999,
};
let networkErr = {
  status: 0,
};
/**
 * A common API method for calling network requests
 * @returns response or error
 */
type commonApiType = {
  method?: 'GET' | 'POST_WITH_FORM' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  url: string;
  params?: {[key: string]: any};
};
export const commonApi = async ({
  method = 'GET',
  url,
  params,
}: commonApiType) => {
  printConsole('net', AppConstants.NETWORK_CHECK);
  if (AppConstants.NETWORK_CHECK) {
    const axiosConfig = {
      authorization: '',
      'Content-Type':
        method === 'POST_WITH_FORM'
          ? 'multipart/form-data'
          : 'application/json',
      device: AppConstants.DEVICE_TYPE,
      token: true,
      'app-version': AppConstants.APP_VERSION,
    };
    if (isNull(StoreConstantValues.USER_ACCESS_TOKEN)) {
      axiosConfig.authorization =
        'Bearer ' + StoreConstantValues.USER_ACCESS_TOKEN;
    }
    switch (method) {
      case 'GET':
        return axios
          .get(url, {headers: axiosConfig, params: params, timeout: timeout})
          .then(response => {
            return response;
          })
          .catch(error => {
            catchError(error);
            return error;
          });
      case 'POST':
        return axios
          .post(url, params, {headers: axiosConfig, timeout: timeout})
          .then(response => {
            return response;
          })
          .catch(error => {
            catchError(error);
            return error;
          });
      case 'PATCH':
        return axios
          .post(url, params, {headers: axiosConfig, timeout: timeout})
          .then(response => {
            return response;
          })
          .catch(error => {
            catchError(error);
            return error;
          });
      case 'PUT':
        return axios
          .put(url, params, {headers: axiosConfig, timeout: timeout})
          .then(response => {
            return response;
          })
          .catch(error => {
            catchError(error);
            return error;
          });
      case 'DELETE':
        return axios
          .delete(url, {
            headers: axiosConfig,
            params: params,
            timeout: timeout,
          })
          .then(response => {
            printConsole('Delete RESPONSE:- ', JSON.stringify(response));
            return response;
          })
          .catch(error => {
            catchError(error);
            return error;
          });
      case 'POST_WITH_FORM':
        return axios
          .post(url, params, {headers: axiosConfig, timeout: timeout})
          .then(response => {
            return response;
          })
          .catch(error => {
            catchError(error);
            return error;
          });
    }
  } else {
    showErrorDialog(noNetworkObj);
  }
};

const handleError = (response: any) => {
  setTimeout(() => {
    showErrorDialog(response);
  }, 500);
};
const catchError = (error: AxiosError) => {
  printConsole('141 API UTIL: ', error);
  if (error && error.message && error.message === 'Network Error') {
    setTimeout(() => {
      showErrorDialog(networkErr);
    }, 500);
  } else {
    handleError(error.response);
  }
};
