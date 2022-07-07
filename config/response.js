const response = ({code, message}, data) => {
   return {
        code: code,
        message: message,
        data: data
   }
  };

  const errResponse = ({code, message}) => {
    return {
        code: code,
        message: message
      }
  };
  
  export { response, errResponse };