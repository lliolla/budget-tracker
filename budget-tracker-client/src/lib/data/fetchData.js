import axios from "axios";

const api = "http://localhost:5050/api/v1/transaction";

const getAllTransactionsData = async () => {
  try {
    const { data } = await axios.get(api);
    return data;
  } catch (error) {
    console.error("Error fetching data from API", error);
    return [];
  }
};

export default getAllTransactionsData;
