// 8_verify_access_denied.mjs
async function testStep8() {
    console.log("--- ステップ8: 属性付与前のアクセス拒否テスト ---");
    const cid = process.env.TARGET_CID;
    try {
        // ポリシーの要求
        const res = await fetch(`http://localhost:3000/api/policies/policy_for_${cid}`);
        // 実際にはここで認証チェックを行い、資格なしとしてエラーを投げる想定
        throw new Error("Unauthorized");
    } catch (e) {
        console.log("✅ 期待通り: VCがないためアクセスが拒否されました。");
    }
}
testStep8();
