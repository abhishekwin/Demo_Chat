const express = require("express");
const app = express();
app.use(express.json());

app.listen(4000, () => {
  console.log(`Server is running on http://localhost:4000`);
});

let inputData = {};

app.use("/input", async (req, res) => {
  const { input } = req.body;
  inputData = input;

  res.send("ok").status(200);
});

app.use('/reset',async(res,res)=>{
    inputData={};
    res.send("ok").status(200);
})

app.use('/get_data',async(res,req)=>{
    res.send({data:inputData})
})
