export function handleErrors(ex,setErrors)
{
    const { response } = ex;
      if (response) {
        const {
          response: {
            data: { errorMessage },
          },
        } = ex;
        if (errorMessage) {
          if (typeof errorMessage === "string") {
            setErrors([errorMessage]);
          } else {
            setErrors(errorMessage);
          }
        }
  }
      else {
        setErrors([ex]);
  }
}