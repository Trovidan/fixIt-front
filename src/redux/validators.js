export const required = (val)=> val && val.length;
export const minLength = (len)=> (val) => val && val.length >= len;
export const maxLength = (len) => (val) => !(val) || val.length <= len;
export const isEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9._-]+\.[A-Z]{2,4}$/i.test(val);
export const isPhoneNumber = (val) => /^\+?([0-9]{2})?[- ]?([0-9]{10})$/.test(val);
export const isPinCode = (val) => /^[1-9]{1}?[0-9]{5}$/.test(val);