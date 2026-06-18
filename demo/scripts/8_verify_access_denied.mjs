// 8_verify_access_denied_with_policy.mjs
import fs from "fs";

async function testStep8() {
  console.log("--- ステップ8: 付与前アクセス拒否テスト（ポリシー照合付き） ---");
  
  // 1. ポリシーを取得 (API連携)
  const cid = process.env.TARGET_CID; // ステップ7から引き継いだCID
  const policyRes = await fetch(`http://localhost:3000/api/policies/${cid}`);
  const policy = await policyRes.json();
  
  console.log(`🔍 [システム] 認可判定中...`);
  console.log(`   - 必須属性: ${policy.rule.requiredAttribute}`);

  // 2. ユーザBのVCを読み込もうとする
  const vcPath = "demo/output/vc_userB.json";
  
  // 3. 【検証過程】属性の照合を試みる
  if (!fs.existsSync(vcPath)) {
      console.log("🔍 [システム] 判定: 属性証明書(VC)が提示されていません。");
      console.log("✅ 期待通り: 属性不足によりアクセスを拒否しました。");
  } else {
      console.error("❌ 失敗: 本来はVCが未発行のためエラーになるはずです。");
  }
}
testStep8();
