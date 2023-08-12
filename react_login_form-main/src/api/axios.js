import axios from 'axios/index';

export const axiosInstances = {
    authaxios: axios.create({
        baseURL: 'http://localhost:8080'
    }),
    selleraxios: axios.create({
        baseURL: 'http://localhost:8089'
    }),
    buyeraxios: axios.create({
        baseURL: 'http://localhost:8086'
    })
};