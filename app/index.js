import { privateKey } from './accounts/accounts.js';
import _0x1d5b89 from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import _0x48b9c7 from './src/utils/logger.js';
import _0x3596ce from './src/utils/twist.js';

// 操作主函数
async function operation(_0x422999) {
  const _0x13b4a6 = new _0x1d5b89(_0x422999);
  try {
    // 连接钱包并执行初始化操作
    await _0x13b4a6.connectWallet();
    await _0x13b4a6.getBalance();
    await _0x13b4a6.signIn();
    await _0x13b4a6.getUserAgent();

    // 检查 AI 代理列表
    if (_0x13b4a6.agentList.length == 0x0) {
      await Helper.delay(0xea60, _0x422999, "账户 " + _0x13b4a6.address + " 没有创建 AI 代理，请至少创建一个自动化关闭的 AI 代理", _0x13b4a6);
    }

    // 遍历所有代理
    for (const _0x578e7b of _0x13b4a6.agentList) {
      if (_0x578e7b.automationEnabled == false) {
        await _0x13b4a6.matchmarking(_0x578e7b);
      }
    }

    // 延迟等待下一轮匹配
    await Helper.delay(0x3a980, _0x422999, "账户 " + (privateKey.indexOf(_0x422999) + 0x1) + " 处理完成，等待 " + Helper.msToTime(0x3a980) + " 后进行下一轮匹配", _0x13b4a6);
    await operation(_0x422999);
  } catch (_0x4acc1c) {
    if (_0x4acc1c.message) {
      await Helper.delay(0x2710, _0x422999, "错误：" + _0x4acc1c.message + "，10秒后重试", _0x13b4a6);
    } else {
      await Helper.delay(0x2710, _0x422999, "错误：" + JSON.stringify(_0x4acc1c) + "，10秒后重试", _0x13b4a6);
    }
    await operation(_0x422999);
  }
}

// 启动机器人
async function startBot() {
  return new Promise(async (_0x5884c6, _0x482201) => {
    try {
      _0x48b9c7.info("机器人已启动");
      if (privateKey.length == 0x0) {
        throw Error("请先在 accounts.js 文件中输入您的账户");
      }

      // 并行处理所有账户
      const _0x40d14f = [];
      for (const _0x144be6 of privateKey) {
        _0x40d14f.push(operation(_0x144be6));
      }
      await Promise.all(_0x40d14f);
      _0x5884c6();
    } catch (_0x380c26) {
      _0x48b9c7.info("机器人已停止");
      _0x48b9c7.error(JSON.stringify(_0x380c26));
      _0x482201(_0x380c26);
    }
  });
}

// 主程序入口
(async () => {
  try {
    _0x48b9c7.clear();
    _0x48b9c7.info('');
    _0x48b9c7.info("应用程序已启动");
    console.log();
    console.log(Helper.botName);
    console.log("加入我们：https://t.me/Sdohuajia");
    await startBot();
  } catch (_0x41f961) {
    _0x3596ce.clear();
    _0x3596ce.clearInfo();
    console.log("运行机器人时出错", _0x41f961);
    await startBot();
  }
})();
