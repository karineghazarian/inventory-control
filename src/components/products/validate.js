import { PRODUCT_TYPES } from "./config";

const validateName = (item) => {
    if(item.name.length < 2 || !item.name) {
        return "Name is too short";
    }
    return "";
}

const validatePrice = (item) => {
    if(item.price < 0 || item.price > 100) {
        return "The Price is out of range";
    }
    return "";
}

const validateQuantity = (item) => {
    if(item.quantity < 0) {
        return "The value should be greater or equal to 0";
    }
    return "";
}

const validationDict = {
    [PRODUCT_TYPES.NAME]: validateName,
    [PRODUCT_TYPES.PRICE]: validatePrice,
    [PRODUCT_TYPES.QUANTITY]: validateQuantity
}

export const validateValue = (item, type) => {
    let errors = {};
    const validationCb = validationDict[type];
    const error = validationCb(item);
    if(error) {
        errors[type] = error;
    }
    return errors;
  };

export const validateAll = (item)=> {
    let errors = {};
    Object.entries(validationDict).forEach(([type, validationCb])=> {
        const error  = validationCb(item);
        if(error) {
            errors[type] = error;
        }
    });
    return errors;
};