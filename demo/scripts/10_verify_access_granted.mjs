// 10_verify_access_granted.mjs
import { createWeb3, getRegistryContract } from "../lib/registry.mjs";
import fs from "fs";
import crypto from "crypto";

(async () => {
  const web3 = createWeb3();
  const registry = await getRegistryContract(web3);

  console.log("--- ステップ10: 付与後のアクセス許可検証 ---");
  
  // 1. APIからポリシー取得
  const policy = await (await fetch(`http://localhost:3000/api/policies/${process.env.TARGET_CID}`)).json();
  
  // 2. 提示されたVCを読み込む
  const vc = JSON.parse(fs.readFileSync("demo/output/vc_userB.json", "utf8"));
  
  // 3. オンチェーン検証 (ハッシュ照合)
  const policyHash = "0x" + crypto.createHash('sha256').update(JSON.stringify(policy)).digest('hex');
  const isValid = await registry.methods.verifyPolicy("policy_001", policyHash).call();
  
  if (isValid && vc.claim.attribute === policy.rule.requiredAttribute) {
    console.log("✅ 成功: オンチェーン検証・属性照合が完了しました。アクセスを許可します。");
  }
})();
