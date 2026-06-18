// 10_verify_access_granted.mjs
const fs = require('fs');
const crypto = require('crypto');
const { contract } = require('./config_loader.js');

async function testStep10() {
    console.log("--- ステップ10: 属性付与後のアクセス許可検証 ---");
    
    // 1. APIからポリシーを取得
    const policy = await (await fetch(`http://localhost:3000/api/policies/policy_for_${process.env.TARGET_CID}`)).json();
    
    // 2. VCを提示
    const vc = JSON.parse(fs.readFileSync('./userB_wallet.json', 'utf8'));
    
    // 3. コントラクトでポリシーハッシュを検証
    const policyHash = "0x" + crypto.createHash('sha256').update(JSON.stringify(policy)).digest('hex');
    const isValid = await contract.verifyPolicy(`policy_for_${process.env.TARGET_CID}`, policyHash);
    
    if (isValid && vc.claim.attribute === policy.rule.requiredAttribute) {
        console.log("✅ 成功: オンチェーン検証・属性照合が完了しました。");
    } else {
        console.error("❌ 失敗: 検証条件を満たしていません。");
    }
}
testStep10();
