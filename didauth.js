var api = typeof browser == 'object' ? browser : chrome;

window.addEventListener("message", function(event) {

	if (event.source != window) return;

	if (event.data.type && (event.data.type == "DID_AUTH")) {

		api.storage.local.get(['dids', 'didnr', 'vcs', 'vc1', 'vc2']).then(function(value) {

			var text = "";
			text += "Submit DID Auth Verifiable Credential for <strong>" + Object.keys(value.dids)[value.didnr] + "</strong>. ";
			if (value.vc1) text += "<br><br>Also submit <strong>'management'</strong> Verifiable Credential. ";
			if (value.vc2) text += "<br><br>Also submit <strong>'delegate'</strong> Verifiable Credential. ";

			alertify.confirm("DID Auth", text,
				function() {
		
					var xhr = new XMLHttpRequest();
					var callback = event.data.callback;
					var data = [ ];
					if (typeof value.didnr !== 'undefined') data.push(Object.values(value.dids)[value.didnr]);
					if (value.vc1) data.push(value.vcs[0]);
					if (value.vc2) data.push(value.vcs[1]);
					xhr.onload = function() {
						alertify.success('Success');
					};
					xhr.onerror = function(e) {
						alertify.error(JSON.stringify(e, ["message", "arguments", "type", "name"]));
					};
					xhr.open('POST', callback);
					xhr.send(JSON.stringify(data));
				},
				function() {
					alertify.error("Aborted.");
				});
		});
	}
}, false);

api.storage.local.get(['dids', 'didnr', 'vc1', 'vc2']).then(function(value) {

	var dids = {'did:sov:DavnUKB3kjn7VmVZXzEDL7': {"@context" : [ "https://w3id.org/credentials/v1", "https://w3id.org/security/v1" ],"type" : [ "Credential", "DidAuthCredential" ],"claim" : {"id" : "did:sov:DavnUKB3kjn7VmVZXzEDL7","publicKey" : "did:sov:DavnUKB3kjn7VmVZXzEDL7#key-1"},"issuer" : "did:sov:DavnUKB3kjn7VmVZXzEDL7","issued" : "2018-03-15","signature" : {"type" : "Ed25519Signature2018","creator" : "did:sov:DavnUKB3kjn7VmVZXzEDL7#key-1","created" : "2018-03-15T00:00:00Z","domain" : null,"nonce" : "21cf8b81-39e9-4fc1-8e03-b9d2c7a04975","signatureValue" : "rIQQG+mrMgdN9YWk1ws8u2tPlJ+5ihOklxUdDa8PFcicjTn/kyYWXU8zFQ9FAnuI+O93sdfpBTy7wAmcSzN2Aw=="}},
		'did:btcr:xs95-wzv8-qqte-jz88': {"type": ["Credential", "DidAuthCredential"],"issuer": "did:btcr:xs95-wzv8-qqte-jz88","issued": "2010-01-01","claim": {"id": "did:btcr:xs95-wzv8-qqte-jz88","publicKey": "did:btcr:xs95-wzv8-qqte-jz88#keys-1"},"proof": {"type": "Secp256k1Signature2018","creator": "did:btcr:xs95-wzv8-qqte-jz88#keys-1","created": "2018-01-01T21:19:10Z","nonce": "...","signatureValue": "..."}},
		'did:v1:test:nym:rZdPg5VF6SqrVuEYEHAuDaeikkA2D8QBLRJQRnhz3pI': {"type": ["Credential", "DidAuthCredential"],"issuer": "did:v1:test:nym:rZdPg5VF6SqrVuEYEHAuDaeikkA2D8QBLRJQRnhz3pI","issued": "2010-01-01","claim": {"id": "did:v1:test:nym:rZdPg5VF6SqrVuEYEHAuDaeikkA2D8QBLRJQRnhz3pI","publicKey": "did:v1:test:nym:rZdPg5VF6SqrVuEYEHAuDaeikkA2D8QBLRJQRnhz3pI#keys-1"},"proof": {"type": "Secp256k1Signature2018","creator": "did:v1:test:nym:rZdPg5VF6SqrVuEYEHAuDaeikkA2D8QBLRJQRnhz3pI#keys-1","created": "2018-01-01T21:19:10Z","nonce": "...","signatureValue": "..."}}};
	var vcs = [{	"type": ["Credential"],	"issuer": "did:sov:0000000000",	"issued": "2010-01-01",	"claim": {		"id": "did:sov:1234567890",		"management": "did:sov:DavnUKB3kjn7VmVZXzEDL7"	},	"proof": {		"type": "Ed25519Signature2018",		"created": "2018-01-01T21:19:10Z",		"creator": "did:sov:0000000000#keys-1",		"nonce": "...",		"signatureValue": "..."	}},
		{	"type": ["Credential"],	"issuer": "did:sov:DavnUKB3kjn7VmVZXzEDL7",	"issued": "2010-01-01",	"claim": {		"id": "did:sov:1234567890",		"management": "did:v1:test:nym:rZdPg5VF6SqrVuEYEHAuDaeikkA2D8QBLRJQRnhz3pI"	},	"proof": {		"type": "Ed25519Signature2018",		"created": "2018-01-01T21:19:10Z",		"creator": "did:sov:DavnUKB3kjn7VmVZXzEDL7#keys-1",		"nonce": "c0ae1c8e-c7e7-469f-b252-86e6a0e7387e",		"signatureValue": "..."	}}];
	if (! value.dids) api.storage.local.set({ 'dids': dids });
	if (! value.didnr) api.storage.local.set({ 'didnr': 0 });
	if (! value.vcs) api.storage.local.set({ 'vcs': vcs });
	if (! value.vc1) api.storage.local.set({ 'vc1': false });
	if (! value.vc2) api.storage.local.set({ 'vc2': false });
});
