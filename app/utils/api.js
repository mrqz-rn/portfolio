

import axios from 'axios';
import store from './store';


const apilink = "http://localhost/swfs-api";

function procRequest(url, data, method = "post") {
    return new Promise((resolve, reject) => {
        axios({
          method: method,
          url: url,
          data: data
        }).then(response => {
          data.has( 'encrypt_fields' ) ? resolve( store.dispatch( 'decodeBase64', { result:response, fields:data.get( 'encrypt_fields' ) } )) : resolve(response);
        }).catch(err => {
          if(err.response.status == 400){
            store.commit( "SHOW_ALERT", {
              type: "error",
              message: "Something went wrong, Please contact your system administrator!",
              status: true,
              timeout: 0
            } );
          }
          if (err.response.status == 401) {
            if (vm.$session.has('swfsUser')) {
              alert('Failure accessing API. Please logout and then login again.');
              vm.$session.destroy();
              location.reload();
            }
            reject(false);
          }
        });
      });
}

export const masterSelect = async (data) => {
    return procRequest(apilink + '/masterdata/masterselect', data, );
};


export const postData = async (endpoint, data) => {
    console.log(endpoint, data);
  return fetchData(apilink + endpoint, { method: "POST", body: JSON.stringify(data) });
};
