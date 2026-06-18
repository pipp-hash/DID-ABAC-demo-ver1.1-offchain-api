// 7_fetch_iot_data.mjs (新規作成)
// 既存の DIDRegistry コントラクトからデータを取得する
const count = await contract.getIoTDataCount(userA_Address);
const record = await contract.getIoTData(userA_Address, count - 1);
console.log("🔍 ブロックチェーン上のIoTデータ記録:", record);
// record.cid が保存されているCIDです
