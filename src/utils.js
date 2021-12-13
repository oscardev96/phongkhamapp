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