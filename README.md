# DID Auth browser extension

This is a browser plugin that supports DID-based authentication and authorization on relying party web pages.

Installation on Firefox:

 1. Open `about:debugging` in Firefox.
 1. Click 'Load Temporary Add-on".
 1. Open the `manifest.json` file in this repository.

Example DID Auth relying party:

 * https://did-auth-relying-party.danubetech.com/
 * https://github.com/peacekeeper/did-auth-relying-party

Example invocation JavaScript code on relying party web page:

	window.postMessage({ type: "DID_AUTH", callback: url + "https://my_callback_url/" }, "*");
