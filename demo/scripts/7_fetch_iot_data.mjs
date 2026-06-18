// 7_verify_access_userA.mjs
import { createWeb3, getRegistryContract, getAccounts, findIoTRecord } from "../lib/registry.mjs";
import fs from "fs";

(async () => {
  const web3 = createWeb3();
  const registry = await getRegistryContract(web3);
  const accounts = await getAccounts(web3);

  // 1. UserAのDIDと、保存されているCIDを読み込む（既存資産の利用）
  const userA_DID = "did:example:userA";
  // 既存のIPFS登録時や3_register...で生成されたCIDファイルを読み込む想定
  const iotData = JSON.parse(fs.readFileSync("demo/output/ipfs_cid.txt", "utf8"));
  const targetCid = iotData.cid;

  console.log("--- ステップ7: ユーザAによるデータアクセス確認 ---");
  
  // 2. ユーザAがオンチェーン上の記録にアクセスできるか検証
  const result = await findIoTRecord(registry, accounts, userA_DID, targetCid);
  
  if (result) {
    console.log("✅ [許可] ユーザAは正当な所有者としてデータにアクセスできました。");
    console.log("   データCID:", result.record.cid);
    // 次のステップ(8, 9, 10)へこのCIDを引き継ぐ
    process.env.TARGET_CID = result.record.cid;
  } else {
    console.error("❌ 失敗: アクセスが拒否されました。");
  }
})();
