const fs = require("fs/promises")

async function ReadData() {
  try {
    await fs.access("listdata.json");
    const data = await fs.readFile("listdata.json");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function WriteData(dataOut) {
  try {
    await fs.writeFile("listdata.json", JSON.stringify(dataOut));
  } catch (error) {
    throw new Error("Error writing data");
  }
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;
