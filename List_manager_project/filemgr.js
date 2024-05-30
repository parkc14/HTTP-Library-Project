const fs = require("fs/promises");
// import fs from 'fs/promises';

async function ReadData() {
  try {
    await fs.access("./listdata.js", fs.constants.R_OK || fs.constants.W_OK);
    const response = await fs.readFile("./listdata.json", "utf8");
    console.log(response.toJSON);
    return JSON.parse(response); 
  } catch (error) {
    console.log(error);
  }
}


async function WriteData(dataOut) {
  try {
    await fs.access("./listdata.js", fs.constants.R_OK || fs.constants.W_OK);
    const data = JSON.stringify(dataOut);
    await fs.writeFile("./listdata.json", data, 'utf8');
    console.log("dataOut: " + dataOut);
    return;
    
  } catch (error) {
    console.log(error);
  }
}
// export default {ReadData, WriteData};
exports.ReadData = ReadData;
exports.WriteData = WriteData;
