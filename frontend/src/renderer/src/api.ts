import axios from "axios";

axios.get("http://localhost:5000/api/hello")
  .then(res => {
    console.log("Go replied:", res.data);
  })
  .catch(err => {
    console.error("Failed to call Go:", err);
  });