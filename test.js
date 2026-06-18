async function runTest() {
    const newPolicy = {
        policyId: "policy_001",
        targetData: "QmYourDataCID",
        rule: {
            requiredAttribute: "Collaborator",
            issuer: "did:example:userA"
        }
    };

    console.log("--- 1. ポリシー作成のテスト ---");
    const postResponse = await fetch('http://localhost:3000/api/policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPolicy)
    });
    console.log(await postResponse.json());
}
runTest();
