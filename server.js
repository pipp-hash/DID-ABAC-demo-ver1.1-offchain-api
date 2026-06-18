const express = require('express');
const app = express();
app.use(express.json());

let policies = [];

app.post('/api/policies', (req, res) => {
    const policy = req.body;
    if (!policy.policyId || !policy.rule) {
        return res.status(400).json({ error: "必要なデータが足りません" });
    }
    policies.push(policy);
    console.log(`✅ 新しいポリシーを保存しました: [${policy.policyId}]`);
    res.status(201).json({ message: "保存成功", data: policy });
});

app.get('/api/policies/:id', (req, res) => {
    const policyId = req.params.id;
    const policy = policies.find(p => p.policyId === policyId);
    if (policy) {
        res.json(policy);
    } else {
        res.status(404).json({ error: "指定されたポリシーが見つかりません" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 オフチェーンAPIが起動しました: http://localhost:${PORT}`);
});
