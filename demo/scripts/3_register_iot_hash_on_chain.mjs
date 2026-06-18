import fs from "fs";
import { createWeb3, getAccounts, getRegistryContract, registerIoTData } from "../../lib/registry.mjs";

(async () => {
  console.log("\n==========================================");
  console.log("🟦 Step3: IoTデータのハッシュをオンチェーンへ登録");
  console.log("==========================================\n");

  // --- Web3・アカウント・Registry接続 ---
  const web3 = createWeb3();
  const accounts = await getAccounts(web3);
  const registry = await getRegistryContract(web3);

  const userA = accounts[0];
  const didUserA = "did:example:userA";

  // --- IoTデータ(CID)の読み込み ---
  // 既存のプロセスで生成されたCIDファイルを読み込む
  const iotData = JSON.parse(fs.readFileSync("demo/output/ipfs_cid.txt", "utf8"));
  const cid = iotData.cid;

  console.log("[1] 登録する IoTデータ情報:");
  console.log(`    DID: ${didUserA}`);
  console.log(`    CID: ${cid}\n`);

  // --- [変更なし] IoTデータのブロックチェーン登録 ---
  console.log("[2] IoTデータをブロックチェーンへ登録中...");
  await registerIoTData(registry, accounts, userA, didUserA, cid);
  console.log("   → IoTデータの CID を登録しました。\n");

  // --- [追加] オフチェーンAPIへのポリシー登録 ---
  // この処理により、ブロックチェーンの登録と連動したアクセス制御が可能になります
  console.log("[3] オフチェーンAPIへアクセスポリシーを登録中...");
  try {
    const response = await fetch('http://localhost:3000/api/policies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        policyId: cid, // データのCIDをポリシーIDとして使用
        rule: { requiredAttribute: "Collaborator" } // 必要な属性を定義
      })
    });

    if (response.ok) {
      console.log("   → APIへのポリシー登録が完了しました。");
    } else {
      console.error("   → API登録に失敗しました。server.js が起動しているか確認してください。");
    }
  } catch (err) {
    console.error("   → APIサーバーに接続できませんでした:", err.message);
  }

  console.log("==========================================");
  console.log("🎉 IoTデータ登録 & ポリシー連携 完了");
  console.log("==========================================\n");
})();
