// 8_verify_access_denied.mjs
import fs from "fs";

async function testStep8() {
  console.log("--- ステップ8: 付与前アクセス拒否テスト ---");
  const vcPath = "demo/output/vc_userB.json"; // 未作成のファイル

  console.log("👤 [UserB] アクセス要求: DIDは有効だがVCを提示...");
  
  // 属性チェックのシミュレーション
  if (!fs.existsSync(vcPath)) {
    console.log("🔍 [システム] 判定: 必要な属性VCが提示されませんでした。");
    console.log("✅ 期待通り: アクセス拒否 (理由: 属性不足)");
  }
}
testStep8();
