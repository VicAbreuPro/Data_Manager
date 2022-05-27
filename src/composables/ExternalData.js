

export default function extraData(){

  const axios = require('axios');

  const getCurrency = async () => {
    try {
      const response = await axios.get(process.env.API_EXC_COIN)
      return response.data
    } catch (error) {
      return response.status
    }
  }
  return{
    getCurrency
  }
}
