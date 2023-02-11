const getError = (err) => {
  let message;
  const dataRes = err.response?.data;
  if (dataRes) {
    if (dataRes.error) message = dataRes.error.message;
    message = dataRes.message;
  } else message = err.message;

  if ((message && message?.includes(500)) || message?.includes("Network Error"))
    message =
      "Something went wrong 👻 Please check your connection and try again, or contact us";
  return message || "Something went wrong, Please try again";
};

export default getError;
