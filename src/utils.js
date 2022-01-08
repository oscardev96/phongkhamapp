import Axios from "axios"


export const common_post = async (url , dataRequest) => {
    let config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      try {
          const res = await Axios.post(url, dataRequest, config)
          return res.data
      } catch (error) {
          console.log(error)
            return null
      }
   
}
export function formatCurrency(num, currency = "", isFull = false) {
  if (!num || num === "") {
      let response = "0 " + currency;
      return response;
  }
  num = Number(num);
  if (num === 0) {
      return "0 " + currency;
  }
  if (num.length == 2) {
      if (num === "00") {
          num = num.replace("00", "0");
      }
  }
  if (num.length > 1) {
      let first = num.substring(0, 1);
      if (first === "0") {
          num = num.substring(1, num.length);
      }
  }
  let result = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  if (!isFull) {
      result = result + ".000 ";
  }
  return result + currency;
}