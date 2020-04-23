
const validate = (val, rules, connectedValue) => {
    let isValid = true;
    for (let rule in rules) {
      switch (rule) {
        case "isEmail":
          isValid = isValid && emailValidator(val);
          break;
        case "minLength":
          isValid = isValid && minLengthValidator(val, rules[rule]);
          break;
        case "equalTo":
          isValid = isValid && equalToValidator(val, connectedValue[rule]);
          break;
        case "checkPassword":
        isValid = isValid && passwordChecl(val);
        break;
        case "notEmpty":
          isValid = isValid && notEmptyValidator(val);
        case "CNIC":
          isValid = isValid && CheckCNIC(val);
        default:
          isValid = true;
      }
    }
    
    return isValid;
  };
  
  const emailValidator = val => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      val
    );
  };
  
  const minLengthValidator = (val, minLength) => {
    
      return val.length >= minLength;
  };
  
  const equalToValidator = (val, checkValue) => {
      return val === checkValue;
  };
  const CheckCNIC= (val) =>{
    let myRegExp = new RegExp(/\d{5}-\d{7}-\d/);
    // var cnic_no_regex = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
    return myRegExp.test(val);
    if(myRegExp.test(val)) {
        //if true
        return true;
        console.log('CNIC TRUE')
        
    }
    else {
      console.log('CNIC fals')

      return false;

    }
}

const notEmptyValidator = val => {
  return val.trim() !== "";
};
const passwordChecl = val => {
  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
if(val.match(passw)) 
{ 
return true;
}else{
  return false;
}
}
  
  export default validate;