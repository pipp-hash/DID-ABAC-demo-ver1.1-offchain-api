// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DIDRegistry {
    struct DIDDoc {
        string did;
        string doc;
    }

    struct IoTRecord {
        string did;
        string cid;
    }

    mapping(address => DIDDoc[]) public didDocuments;
    mapping(address => IoTRecord[]) public iotData;

    event DIDRegistered(address indexed owner, string did);
    event IoTDataRegistered(address indexed owner, string did, string cid);

    // --- DID Document登録 ---
    function registerDIDDocument(string memory did, string memory didDocumentJson) public {
        didDocuments[msg.sender].push(DIDDoc(did, didDocumentJson));
        emit DIDRegistered(msg.sender, did);
    }

    // --- IoTデータ(CID)登録 ---
    function registerIoTData(string memory did, string memory cid) public {
        iotData[msg.sender].push(IoTRecord(did, cid));
        emit IoTDataRegistered(msg.sender, did, cid);
    }

    // DID Document件数取得
    function getDIDDocument(address owner, uint256 index) public view returns(string memory did, string memory doc) {
        DIDDoc storage d = didDocuments[owner][index];
        return (d.did, d.doc);
    }

    // IoTデータ取得
    function getIoTData(address owner, uint256 index) public view returns(string memory did, string memory cid) {
        IoTRecord storage r = iotData[owner][index];
        return (r.did, r.cid);
    }

    // DID Documentの件数取得
    function getDIDCount(address owner) public view returns(uint256) {
        return didDocuments[owner].length;
    }

    // IoTデータの件数取得
    function getIoTDataCount(address owner) public view returns(uint256) {
        return iotData[owner].length;
    }

// --- 以下、今回追加するアクセスポリシー検証機能 ---
    
    // policyId と ハッシュ値 を紐付けて保存する台帳
    mapping(string => bytes32) public policyHashes;

    // ポリシーのハッシュ値を記録（ユーザAがポリシーを作成した時に呼び出す）
    function registerPolicyHash(string memory policyId, bytes32 hash) public {
        policyHashes[policyId] = hash;
    }

    // ポリシーが改ざんされていないか検証（アクセス検証時に呼び出す）
    function verifyPolicy(string memory policyId, bytes32 providedHash) public view returns (bool) {
        return policyHashes[policyId] == providedHash;
    }
}
