const fs = require('fs');
const crypto = require('crypto');

async function runVerification() {
    console.log("=== [フェーズ3] アクセス要求の検証プロセス ===");

    if (!fs.existsSync('userB_wallet.json')) {
        console.error("❌ ユーザBは証明書（VC）を持っていません。アクセスを拒否します。");
        return;
    }
    const presentedVC = JSON.parse(fs.readFileSync('userB_wallet.json', 'utf8'));
    console.log("👤 ユーザBが証明書(VC)を提示しました:", presentedVC.claim);

    const response = await fetch('http://localhost:3000/api/policies/policy_001');
    const policy = await response.json();
    console.log("📄 オフチェーンからポリシーを取得しました。");

    const policyString = JSON.stringify(policy);
    const bytes32Hash = "0x" + crypto.createHash('sha256').update(policyString).digest('hex');
    console.log(`🔗 オンチェーン照合用ハッシュ値を計算: ${bytes32Hash}`);

    console.log("\n🔍 ポリシーと提示されたVCを照合中...");
    const isIssuerValid = (presentedVC.issuer === policy.rule.issuer);
    const isAttributeValid = (presentedVC.claim.attribute === policy.rule.requiredAttribute);

    if (isIssuerValid && isAttributeValid) {
        console.log(`✅ アクセス許可！ (ユーザAが発行した正規の属性 '${presentedVC.claim.attribute}' を確認しました)`);
        console.log(`🔓 データCID [${policy.targetData}] の復号プロセスへ移行します...`);
    } else {
        console.log(`❌ アクセス拒否 (条件を満たしていません)`);
    }
}
runVerification();
