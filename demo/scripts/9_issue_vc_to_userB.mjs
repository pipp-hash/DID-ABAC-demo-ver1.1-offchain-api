// 9_issue_vc_to_userB.mjs
const fs = require('fs');
async function testStep9() {
    console.log("--- ステップ9: ユーザAからBへの属性付与 ---");
    const vc = {
        issuer: "did:example:userA",
        subject: "did:example:userB",
        claim: { attribute: "Collaborator" },
        issuedAt: new Date().toISOString()
    };
    fs.writeFileSync('userB_wallet.json', JSON.stringify(vc, null, 2));
    console.log("✅ VCを生成しました: userB_wallet.json");
}
testStep9();
