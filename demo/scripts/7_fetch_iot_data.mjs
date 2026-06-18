// 7_fetch_iot_data.mjs
const { contract, userA_Address } = require('./config_loader.js'); // 既存の接続設定を読み込み

async function testStep7() {
    console.log("--- ステップ7: ブロックチェーン上のIoTデータ照合 ---");
    const count = await contract.getIoTDataCount(userA_Address);
    const record = await contract.getIoTData(userA_Address, count - 1);
    console.log("✅ 取得したデータ:", record);
    // 次のステップで使うためにCIDを保持
    process.env.TARGET_CID = record.cid;
}
testStep7();
