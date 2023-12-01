const fs = require('fs').promises;
const path = require('path');

const bgArr = [];
let countBG = 0;
const rent_services = document.querySelector("#rent-services");


async function traverseFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath);

    for (const file of files) {
      const fullPath = path.join(folderPath, file);

      const stats = await fs.stat(fullPath);

      if (stats.isDirectory()) {
        await traverseFolder(fullPath);
      } else {
        console.log(fullPath);
        bgArr.push(fullPath);
      }
    }
  } catch (err) {
    console.error('Error reading folder:', err);
  }
}

// 使用相對路徑
const relativeFolderPath = './image/head';

// 將相對路徑轉換為絕對路徑
const absoluteFolderPath = path.resolve(relativeFolderPath);

traverseFolder(absoluteFolderPath);

setInterval(()=>{
    rent_services.style.background = url(bgArr[countBG]);
},1000);

