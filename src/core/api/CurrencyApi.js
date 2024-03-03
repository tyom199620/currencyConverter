import {ApiRequest } from "./ApiRequest";

export const getCurrency = async () => {
  return new Promise(async (resolve, reject) => {

    const apiUrl = `https://api.vatcomply.com/currencies`;

    ApiRequest(apiUrl, 'GET', null)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });

  });
};

export const convertAmount = async (data) => {
  return new Promise(async (resolve, reject) => {

    const {from, to, amount} = data;
    const apiUrl = `https://api.fxratesapi.com/latest?base=${from}&currencies=${to}&resolution=1m&amount=${amount}&places=3&format=json`;

    ApiRequest(apiUrl, 'GET', null)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });

  });
};

export const getRates = async (data) => {
  return new Promise(async (resolve, reject) => {

    const {base} = data;
    const apiUrl = `https://api.vatcomply.com/rates?base=${base}`;

    ApiRequest(apiUrl, 'GET', null)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });

  });
};
