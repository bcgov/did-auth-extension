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
						swal("Success: " + xhr.response, { icon: "success" });
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
		});
	}
}, false);

api.storage.local.get(['dids', 'didnr', 'vc1', 'vc2']).then(function(value) {

	var dids = {'did:sov:DavnUKB3kjn7VmVZXzEDL7': {"@context" : [ "https://w3id.org/credentials/v1", "https://w3id.org/security/v1" ],"type" : [ "Credential", "DidAuthCredential" ],"claim" : {"id" : "did:sov:DavnUKB3kjn7VmVZXzEDL7","publicKey" : "did:sov:DavnUKB3kjn7VmVZXzEDL7#key-1"},"issuer" : "did:sov:DavnUKB3kjn7VmVZXzEDL7","issued" : "2018-03-15","signature" : {"type" : "Ed25519Signature2018","creator" : "did:sov:DavnUKB3kjn7VmVZXzEDL7#key-1","created" : "2018-03-15T00:00:00Z","domain" : null,"nonce" : "21cf8b81-39e9-4fc1-8e03-b9d2c7a04975","signatureValue" : "rIQQG+mrMgdN9YWk1ws8u2tPlJ+5ihOklxUdDa8PFcicjTn/kyYWXU8zFQ9FAnuI+O93sdfpBTy7wAmcSzN2Aw=="}},
		'did:btcr:xs95-wzv8-qqte-jz88': {"@context" : [ "https://w3id.org/credentials/v1", "https://w3id.org/security/v1" ],"type" : [ "Credential", "DidAuthCredential" ],"claim" : {"id" : "did:btcr:xs95-wzv8-qqte-jz88","publicKey" : "did:btcr:xs95-wzv8-qqte-jz88#key-1"},"issuer" : "did:btcr:xs95-wzv8-qqte-jz88","issued" : "2018-03-15","signature" : {"type" : "EcdsaKoblitzSignature2016","creator" : "did:btcr:xs95-wzv8-qqte-jz88#key-1","created" : "2018-03-15T00:00:00Z","domain" : null,"nonce" : "54c83860-a79b-4523-88f9-ad420c669c12","signatureValue" : "MEUCIQC8JxrztioLbR5dfQwLBPnKMfE6RObSU9jpAJUr+YBxSQIgCbTbiabx8DMeKKgW1BfT+c+U9fy7DnhYjfH1xGFU8GY="}},
		'did:v1:test:nym:UxYjr6F3hqwiF3yffplpcsV3pXSWSzVQ2396WT65e2E': {"@context" : [ "https://w3id.org/credentials/v1", "https://w3id.org/security/v1" ],"type" : [ "Credential", "DidAuthCredential" ],"claim" : {"id" : "did:v1:test:nym:UxYjr6F3hqwiF3yffplpcsV3pXSWSzVQ2396WT65e2E","publicKey" : "did:v1:test:nym:UxYjr6F3hqwiF3yffplpcsV3pXSWSzVQ2396WT65e2E#authn-key-1"},"issuer" : "did:v1:test:nym:UxYjr6F3hqwiF3yffplpcsV3pXSWSzVQ2396WT65e2E","issued" : "2018-03-15","signature" : {"type" : "RsaSignature2017","creator" : "did:v1:test:nym:UxYjr6F3hqwiF3yffplpcsV3pXSWSzVQ2396WT65e2E#authn-key-1","created" : "2018-03-15T00:00:00Z","domain" : null,"nonce" : "3699b48f-a194-4415-8da3-b76269f63746","signatureValue" : "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..aEFVYt0PZ-wMQfAWEgW-2Xv9fr2B8v-s6-ODiCqII9hZdadAf4ovMC8B4UZCk4jwajnaOhHEqUoZJuFAVcrmDVK3aZiGhfraEDLsbWajk60rSPPy_a3o3AWEz5r-JMDwFH8TcxlTg62MmYpeW4JJY8O32WTKRNjfv1tJtGw5kkcGB4L7zhtog4P_SjzQIFVCG2NJZ-OqDi72_fK0ioYAM4BJHMhP53YKG7_-7uaTp5-oW0KVoXl2ot33SWSGUFqeSvXSpvXPSf9lhZg0h-1fG6suArTCzcWrQc5LaWelnmkSfBQMmDpMsfAm9Ic6x1fmXDpeUCfQ-XzeDUWZLo3sZQ"}}};

	var vcs = [{"@context" : [ "https://w3id.org/credentials/v1", "https://w3id.org/security/v1" ],"type" : [ "Credential" ],"issuer" : "did:sov:MDBKSD4Cm5EhhXWzTynube","issued" : "2018-03-15","claim" : {"id" : "did:sov:1234567890","management" : "did:sov:DavnUKB3kjn7VmVZXzEDL7"},"signature" : {"type" : "Ed25519Signature2018","creator" : "did:sov:MDBKSD4Cm5EhhXWzTynube#key-1","created" : "2018-03-15T00:00:00Z","domain" : null,"nonce" : "d1458980-d63b-4c3c-aad9-f1d182f5b399","signatureValue" : "CGG+Isa9QtpqS9NuKTATBipY2cb50fFlCKHyLPV+Z136m304IqHjWnP9M0QM6i4ilYuUcS2ibOJtjWPHfmk7AQ=="}},
		{"@context" : [ "https://w3id.org/credentials/v1", "https://w3id.org/security/v1" ],"type" : [ "Credential" ],"issuer" : "did:sov:DavnUKB3kjn7VmVZXzEDL7","issued" : "2018-03-15","claim" : {"id" : "did:sov:1234567890","management" : "did:v1:test:nym:rZdPg5VF6SqrVuEYEHAuDaeikkA2D8QBLRJQRnhz3pI"},"signature" : {"type" : "Ed25519Signature2018","creator" : "did:sov:DavnUKB3kjn7VmVZXzEDL7#key-1","created" : "2018-03-15T00:00:00Z","domain" : null,"nonce" : "17eb96ae-ccef-4500-bb5b-01e92a93abe7","signatureValue" : "YuYSql92rC1PloE3TNSD/4LJ15I3zbbMtYB4D6BSWdnuvOJBX1WobbDC0/tAcuJ0xWkL47DpOibJXFsKIjlsDw=="}}];

	if (! value.dids) api.storage.local.set({ 'dids': dids });
	if (! value.didnr) api.storage.local.set({ 'didnr': 0 });
	if (! value.vcs) api.storage.local.set({ 'vcs': vcs });
	if (! value.vc1) api.storage.local.set({ 'vc1': false });
	if (! value.vc2) api.storage.local.set({ 'vc2': false });
});
