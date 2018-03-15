var api = typeof browser == 'object' ? browser : chrome;

window.addEventListener("message", function(event) {

	if (event.source != window) return;

	if (event.data.type && (event.data.type == "DID_AUTH")) {

		swal("Good job!", "You clicked the button!", "success");

		api.storage.local.get(['dids', 'didnr', 'vcs', 'vc1', 'vc2']).then(function(value) {

			var text = "";
			text += "Submit DID Auth Verifiable Credential for " + Object.keys(value.dids)[value.didnr] + ". ";
			if (value.vc1) text += "\n\nAlso submit 'management' Verifiable Credential. ";
			if (value.vc2) text += "\n\nAlso submit 'delegate' Verifiable Credential. ";

			swal({
				title: "DID Auth",
				text: text,
				icon: "info",
				buttons: true,
			})
			.then((yes) => {

				if (yes) {
		
					var xhr = new XMLHttpRequest();
					var callback = event.data.callback;
					var data = [ ];
					if (typeof value.didnr !== 'undefined') data.push(Object.values(value.dids)[value.didnr]);
					if (value.vc1) data.push(value.vcs[0]);
					if (value.vc2) data.push(value.vcs[1]);
					xhr.onload = function() {
						swal("Success!", { icon: "success" });
					};
					xhr.onerror = function(e) {
						swal(JSON.stringify(e, ["message", "arguments", "type", "name"]), { icon: "error" });
					};
					xhr.open('POST', callback);
					xhr.send(JSON.stringify(data));
				} else {

					swal("Aborted.");
				}
			});

			alertify.confirm("DID Auth", text,
				function() {
				},
				function() {
					alertify.error("Aborted.");
				});
		});
	}
}, false);

api.storage.local.get(['dids', 'didnr', 'vc1', 'vc2']).then(function(value) {

	var dids = {'did:sov:DavnUKB3kjn7VmVZXzEDL7': {"@context" : [ "https://w3id.org/credentials/v1", "https://w3id.org/security/v1" ],"type" : [ "Credential", "DidAuthCredential" ],"claim" : {"id" : "did:sov:DavnUKB3kjn7VmVZXzEDL7","publicKey" : "did:sov:DavnUKB3kjn7VmVZXzEDL7#key-1"},"issuer" : "did:sov:DavnUKB3kjn7VmVZXzEDL7","issued" : "2018-03-15","signature" : {"type" : "Ed25519Signature2018","creator" : "did:sov:DavnUKB3kjn7VmVZXzEDL7#key-1","created" : "2018-03-15T00:00:00Z","domain" : null,"nonce" : "21cf8b81-39e9-4fc1-8e03-b9d2c7a04975","signatureValue" : "rIQQG+mrMgdN9YWk1ws8u2tPlJ+5ihOklxUdDa8PFcicjTn/kyYWXU8zFQ9FAnuI+O93sdfpBTy7wAmcSzN2Aw=="}},
		'did:btcr:xs95-wzv8-qqte-jz88': {"@context" : [ "https://w3id.org/credentials/v1", "https://w3id.org/security/v1" ],"type" : [ "Credential", "DidAuthCredential" ],"claim" : {"id" : "did:btcr:xs95-wzv8-qqte-jz88","publicKey" : "did:btcr:xs95-wzv8-qqte-jz88#key-1"},"issuer" : "did:btcr:xs95-wzv8-qqte-jz88","issued" : "2018-03-15","signature" : {"type" : "EcdsaKoblitzSignature2016","creator" : "did:btcr:xs95-wzv8-qqte-jz88#key-1","created" : "2018-03-15T00:00:00Z","domain" : null,"nonce" : "54c83860-a79b-4523-88f9-ad420c669c12","signatureValue" : "MEUCIQC8JxrztioLbR5dfQwLBPnKMfE6RObSU9jpAJUr+YBxSQIgCbTbiabx8DMeKKgW1BfT+c+U9fy7DnhYjfH1xGFU8GY="}},
		'did:v1:test:nym:rZdPg5VF6SqrVuEYEHAuDaeikkA2D8QBLRJQRnhz3pI': {"@context" : [ "https://w3id.org/credentials/v1", "https://w3id.org/security/v1" ],"type" : [ "Credential", "DidAuthCredential" ],"claim" : {"id" : "did:v1:test:nym:rZdPg5VF6SqrVuEYEHAuDaeikkA2D8QBLRJQRnhz3pI","publicKey" : "did:v1:test:nym:rZdPg5VF6SqrVuEYEHAuDaeikkA2D8QBLRJQRnhz3pI#key-1"},"issuer" : "did:v1:test:nym:rZdPg5VF6SqrVuEYEHAuDaeikkA2D8QBLRJQRnhz3pI","issued" : "2018-03-15","signature" : {"type" : "RsaSignature2017","creator" : "did:v1:test:nym:rZdPg5VF6SqrVuEYEHAuDaeikkA2D8QBLRJQRnhz3pI#key-1","created" : "2018-03-15T00:00:00Z","domain" : null,"nonce" : "372ae80c-866c-490a-9381-a6a554edd7b7","signatureValue" : "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..AbKXuBP9_Lnqtwerd4dfFNQ25_9mQTfrJtQ6VpJlVIH8BWvmBQtEC-Si01C_IxUCIll3EdBXaTBbY8HSPK2yHV3sYzme2SV2CSYXq57ocM7gpSXk_jQHuFddjuP8xhUnns_M3k-R9t4gySVPmnFABHcYWHfscz07PMAU4DS95ElKJ5kNLHuEdCgP4CU5Am7N_MuuPFUNYRg2TRU64tw2zsX0P_N43Tid6jSYdHg96XAcli5eL625sMMlnsy2wCGRIYmIFTfnHVPrSPWI826nsDIsSZSrtO9R5i_AzkiAuedCaJHBEonZeOiX6pVy-tDvizHUGc7xVDzeGzHmiacLpA"}}};

	var vcs = [{	"type": ["Credential"],	"issuer": "did:sov:0000000000",	"issued": "2010-01-01",	"claim": {		"id": "did:sov:1234567890",		"management": "did:sov:DavnUKB3kjn7VmVZXzEDL7"	},	"proof": {		"type": "Ed25519Signature2018",		"created": "2018-01-01T21:19:10Z",		"creator": "did:sov:0000000000#keys-1",		"nonce": "...",		"signatureValue": "..."	}},
		{	"type": ["Credential"],	"issuer": "did:sov:DavnUKB3kjn7VmVZXzEDL7",	"issued": "2010-01-01",	"claim": {		"id": "did:sov:1234567890",		"management": "did:v1:test:nym:rZdPg5VF6SqrVuEYEHAuDaeikkA2D8QBLRJQRnhz3pI"	},	"proof": {		"type": "Ed25519Signature2018",		"created": "2018-01-01T21:19:10Z",		"creator": "did:sov:DavnUKB3kjn7VmVZXzEDL7#keys-1",		"nonce": "c0ae1c8e-c7e7-469f-b252-86e6a0e7387e",		"signatureValue": "..."	}}];

	if (! value.dids) api.storage.local.set({ 'dids': dids });
	if (! value.didnr) api.storage.local.set({ 'didnr': 0 });
	if (! value.vcs) api.storage.local.set({ 'vcs': vcs });
	if (! value.vc1) api.storage.local.set({ 'vc1': false });
	if (! value.vc2) api.storage.local.set({ 'vc2': false });
});
