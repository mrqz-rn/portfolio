import { createStore } from 'redux';

const initialState = {
  alert: {
    message: "",
    type: "warning",
    status: false,
    timeout: 0,
    value: false
  },
  confidential_fields: "basicPay_A,basicPay_A_format,basicAllowance_A,basicAllowance_A_format,basicPay_B,basicPay_B_format,basicAllowance_B,basicAllowance_B_format,monthlyAllowance,monthlyAllowance_format,dailyAllowance,dailyAllowance_format"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        ...state,
        alert: {
          message: action.payload.message,
          type: action.payload.type,
          status: action.payload.status,
          timeout: action.payload.timeout,
          value: action.payload.value
        }
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
