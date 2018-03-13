window.addEventListener("message", function(event) {

	if (event.source != window) return;

	if (event.data.type && (event.data.type == "DID_AUTH")) {

		browser.storage.local.get(['dids', 'didnr', 'vcs', 'vc1', 'vc2']).then(function(value) {

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

browser.storage.local.get(['dids', 'didnr', 'vc1', 'vc2']).then(function(value) {

	var dids = {'did:sov:DavnUKB3kjn7VmVZXzEDL7': {"type": ["Credential", "DidAuthCredential"],"issuer": "did:sov:DavnUKB3kjn7VmVZXzEDL7","issued": "2010-01-01","claim": {"id": "did:sov:DavnUKB3kjn7VmVZXzEDL7","publicKey": "did:sov:DavnUKB3kjn7VmVZXzEDL7#keys-1"},"proof": {"type": "Secp256k1Signature2018","creator": "did:sov:DavnUKB3kjn7VmVZXzEDL7#keys-1","created": "2018-01-01T21:19:10Z","nonce": "...","signatureValue": "..."}},
		'did:btcr:xkrn-xzcr-qqlv-j6sl': {"type": ["Credential", "DidAuthCredential"],"issuer": "did:btcr:xkrn-xzcr-qqlv-j6sl","issued": "2010-01-01","claim": {"id": "did:btcr:xkrn-xzcr-qqlv-j6sl","publicKey": "did:btcr:xkrn-xzcr-qqlv-j6sl#keys-1"},"proof": {"type": "Secp256k1Signature2018","creator": "did:btcr:xkrn-xzcr-qqlv-j6sl#keys-1","created": "2018-01-01T21:19:10Z","nonce": "...","signatureValue": "..."}},
		'did:v1:test:nym:3AEJTDMSxDDQpyUftjuoeZ2Bazp4Bswj1ce7FJGybCUu': {"type": ["Credential", "DidAuthCredential"],"issuer": "did:v1:test:nym:3AEJTDMSxDDQpyUftjuoeZ2Bazp4Bswj1ce7FJGybCUu","issued": "2010-01-01","claim": {"id": "did:v1:test:nym:3AEJTDMSxDDQpyUftjuoeZ2Bazp4Bswj1ce7FJGybCUu","publicKey": "did:v1:test:nym:3AEJTDMSxDDQpyUftjuoeZ2Bazp4Bswj1ce7FJGybCUu#keys-1"},"proof": {"type": "Secp256k1Signature2018","creator": "did:v1:test:nym:3AEJTDMSxDDQpyUftjuoeZ2Bazp4Bswj1ce7FJGybCUu#keys-1","created": "2018-01-01T21:19:10Z","nonce": "...","signatureValue": "..."}}};
	var vcs = [{	"type": ["Credential"],	"issuer": "did:sov:0000000000",	"issued": "2010-01-01",	"claim": {		"id": "did:sov:1234567890",		"management": "did:sov:DavnUKB3kjn7VmVZXzEDL7"	},	"proof": {		"type": "Ed25519Signature2018",		"created": "2018-01-01T21:19:10Z",		"creator": "did:sov:0000000000#keys-1",		"nonce": "...",		"signatureValue": "..."	}},
		{	"type": ["Credential"],	"issuer": "did:sov:DavnUKB3kjn7VmVZXzEDL7",	"issued": "2010-01-01",	"claim": {		"id": "did:sov:1234567890",		"management": "did:v1:test:nym:3AEJTDMSxDDQpyUftjuoeZ2Bazp4Bswj1ce7FJGybCUu"	},	"proof": {		"type": "Ed25519Signature2018",		"created": "2018-01-01T21:19:10Z",		"creator": "did:sov:DavnUKB3kjn7VmVZXzEDL7#keys-1",		"nonce": "c0ae1c8e-c7e7-469f-b252-86e6a0e7387e",		"signatureValue": "..."	}}];
	if (! value.dids) browser.storage.local.set({ 'dids': dids });
	if (! value.didnr) browser.storage.local.set({ 'didnr': 0 });
	if (! value.vcs) browser.storage.local.set({ 'vcs': vcs });
	if (! value.vc1) browser.storage.local.set({ 'vc1': false });
	if (! value.vc2) browser.storage.local.set({ 'vc2': false });
});
