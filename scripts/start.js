import fs from "fs";
import path from "path";

async function copyFolder(src, dest) {
  try {
    // 创建目标文件夹（如果不存在）
    await fs.promises.mkdir(dest, { recursive: true });
    // 读取源文件夹中的所有条目
    const entries = await fs.promises.readdir(src, { withFileTypes: true });

    // 遍历所有文件和文件夹
    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        // 如果是文件夹，递归复制
        await copyFolder(srcPath, destPath);
      } else {
        // 如果是文件，直接复制
        await fs.promises.copyFile(srcPath, destPath);
      }
    }

    console.log(`已复制 ${src} 到 ${dest}`);
  } catch (err) {
    console.error(`从 ${src} 复制到 ${dest} 时发生错误:`, err);
  }
}

// 定义源文件夹和目标文件夹的路径
const accountsSrc = path.join(process.cwd(), "accounts");
const configSrc = path.join(process.cwd(), "config");
const accountsDest = path.join(process.cwd(), "app", "accounts");
const configDest = path.join(process.cwd(), "app", "config");

// 立即执行的异步函数
(async () => {
  // 复制 accounts 和 config 文件夹
  await copyFolder(accountsSrc, accountsDest);
  await copyFolder(configSrc, configDest);

  console.log("正在启动应用程序...");
  await import("../app/index.js");
})();
