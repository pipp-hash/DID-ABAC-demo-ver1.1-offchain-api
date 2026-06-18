const fs = require('fs');
const crypto = require('crypto');

console.log("=== [フェーズ2] ユーザAによる属性付与（VC発行） ===");

const verifiableCredential = {
    issuer: "did:example:userA",
    subject: "did:example:userB",
    claim: { attribute: "Collaborator" },
    issuedAt: new Date().toISOString()
};

const vcString = JSON.stringify(verifiableCredential);
verifiableCredential.signature = crypto.createHash('sha256').update(vcString + "UserA_SecretKey").digest('hex');

fs.writeFileSync('userB_wallet.json', JSON.stringify(verifiableCredential, null, 2));

console.log("✅ ユーザAがユーザBに『Collaborator』属性を付与しました！");
console.log("📁 ユーザBのウォレット（userB_wallet.json）にVCが保存されました。");
