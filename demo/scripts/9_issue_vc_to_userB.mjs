// 9_issue_vc_to_userB.mjs
import fs from "fs";
async function testStep9() {
  console.log("--- ステップ9: ユーザAがUserBに属性を付与 ---");
  const vcForB = {
    issuer: "did:example:userA",
    subject: "did:example:userB",
    claim: { attribute: "Collaborator", cid: process.env.TARGET_CID }
  };
  fs.writeFileSync("demo/output/vc_userB.json", JSON.stringify(vcForB, null, 2));
  console.log("✅ 発行完了: UserB用VC (属性:Collaborator) を保存しました。");
}
testStep9();
