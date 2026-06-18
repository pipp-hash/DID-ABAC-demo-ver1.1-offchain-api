import fs from "fs";
import { createWeb3, getAccounts, getRegistryContract, registerIoTData, registerIoTDocument } from "../../lib/registry.mjs";

(async () => {
  console.log("\n==========================================");
  console.log("🟦 Step1: DID ドキュメント生成 & 登録");
  console.log("==========================================\n");

  // --- Web3・アカウント・Registry接続 ---
  const web3 = createWeb3();
  const accounts = await getAccounts(web3);
  const registry = await getRegistryContract(web3);

  const userA = accounts[0];
  const userB = accounts[2]; // 追加: UserB用のアカウント
  const company = accounts[1];

  // --- DID Document 作成 ---
  const didUserA = "did:example:userA";
  const didDocUserA = { id: didUserA, controller: userA };

  const didUserB = "did:example:userB"; // 追加: UserB用DID
  const didDocUserB = { id: didUserB, controller: userB };

  const didCompany = "did:example:company";
  const didDocCompany = { id: didCompany, controller: company };

  console.log("[1] DID Document を作成しました。\n");
  console.log(`📄 UserA DID: ${didUserA}`);
  console.log(`📄 UserB DID: ${didUserB}`); // 追加
  console.log(`📄 Company DID: ${didCompany}`);

  // ファイル保存
  fs.writeFileSync("demo/output/userA_did.json", JSON.stringify(didDocUserA, null, 2));
  fs.writeFileSync("demo/output/userB_did.json", JSON.stringify(didDocUserB, null, 2)); // 追加
  fs.writeFileSync("demo/output/company_did.json", JSON.stringify(didDocCompany, null, 2));

  // --- UserA の DID 登録 ---
  console.log("[2] UserA の DID をブロックチェーンへ登録中...");
  await registerIoTDocument(registry, userA, didUserA, didDocUserA);
  console.log("   → UserA の DID を登録しました。\n");

  // --- UserB の DID 登録 ---
  console.log("[3] UserB の DID をブロックチェーンへ登録中..."); // 追加
  await registerIoTDocument(registry, userB, didUserB, didDocUserB);
  console.log("   → UserB の DID を登録しました。\n");

  // --- Company の DID 登録 ---
  console.log("[4] Company の DID をブロックチェーンへ登録中...");
  await registerIoTDocument(registry, company, didCompany, didDocCompany);
  console.log("   → Company の DID を登録しました。\n");

  console.log("==========================================");
  console.log("🎉 DID ドキュメント登録 完了 (UserB含む)");
  console.log("==========================================\n");
})();
