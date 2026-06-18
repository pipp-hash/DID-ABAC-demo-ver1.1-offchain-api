// 10_verify_access_granted.mjs
import { createWeb3, getRegistryContract } from "../lib/registry.mjs";
import fs from "fs";
import crypto from "crypto";

(async () => {
  console.log("--- ステップ10: 付与後のアクセス許可検証 ---");

  // 1. APIからポリシーを取得 (期待値: Collaborator属性が必要)
  const policyResponse = await fetch(`http://localhost:3000/api/policies/${process.env.TARGET_CID}`);
  const policy = await policyResponse.json();

  // 2. 提示されたVCを読み込む
  const vcPath = "demo/output/vc_userB.json";
  if (!fs.existsSync(vcPath)) {
      console.error("❌ 失敗: 提示されたVCが見つかりません。");
      return;
  }
  const vc = JSON.parse(fs.readFileSync(vcPath, "utf8"));

  // 3. 【検証過程】属性の照合
  console.log(`🔍 検証中: VCの属性 '${vc.claim.attribute}' vs ポリシーの要求 '${policy.rule.requiredAttribute}'`);
  
  if (vc.claim.attribute !== policy.rule.requiredAttribute) {
      console.error("❌ 失敗: VCの属性がポリシーと一致しません。");
      return;
  }
  console.log("✅ 属性照合OK: VCはポリシー要件を満たしています。");

  // 4. オンチェーン検証 (ハッシュ照合)
  const web3 = createWeb3();
  const registry = await getRegistryContract(web3);
  const policyHash = "0x" + crypto.createHash('sha256').update(JSON.stringify(policy)).digest('hex');
  
  const isValid = await registry.methods.verifyPolicy("policy_001", policyHash).call();
  
  if (isValid) {
    console.log("✅ 成功: オンチェーンのポリシーハッシュ検証も完了。アクセスを許可します！");
  } else {
    console.error("❌ 失敗: オンチェーン上のポリシーハッシュが不正です（改ざんの疑い）。");
  }
})();
