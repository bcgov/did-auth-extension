
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Lifecycle:Dormant](https://img.shields.io/badge/Lifecycle-Dormant-ff7f2a)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)

# DID Auth browser add-on

This is a WebExtensions-compatible DID Auth browser add-on that supports DID-based authentication and authorization on relying party web pages.

## Technology Stack Used

 * [Decentralized Identifiers (DIDs)](https://w3c-ccg.github.io/did-spec/)
 * [DID Auth](https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust-spring2018/blob/master/draft-documents/did_auth_draft.md)
 * [Verifiable Credentials](https://w3c.github.io/vc-data-model/)
 * [Linked Data Signatures](https://w3c-dvcg.github.io/ld-signatures/)
 * [Linked Data Cryptographic Suites](https://w3c-ccg.github.io/ld-cryptosuite-registry/)
 * [WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/)

## Third-Party Products/Libraries used and the License they are covert by

 * [SweetAlert](https://sweetalert.js.org/) - MIT

## Project Status

Under development for a [BCDevExchange opportunity](https://bcdevexchange.org/opportunities/opp-initial-reference-implementation-of-decentralized-authentication--did-auth--and-authorization-mechanisms). Note that the underlying technologies (DIDs, DID Auth, Verifiable Credentials) are still heavily evolving.

All repositories related to this project:

 * https://github.com/bcgov/did-auth-extension - A DID Auth browser add-on **(this repository)**
 * https://github.com/bcgov/did-auth-relying-party - A DID Auth relying party
 * https://github.com/bcgov/http-did-auth-proxy - A DID Auth HTTP proxy

## Documentation

Example invocation JavaScript code on relying party web site that will invokve the DID Auth browser add-on:

	window.postMessage({ type: "DID_AUTH", callback: url + "https://my_callback_url/" }, "*");

DID Auth relying party sample deployment: https://did-auth-relying-party.danubetech.com/

## Deployment (Local Development)

Installation on Firefox:

 1. Open `about:debugging` in Firefox.
 1. Click 'Load Temporary Add-on".
 1. Open the `manifest.json` file in this repository.

Removal on Firefox:

 1. Open `about:addons` in Firefox.
 1. Remove the add-on.

## Getting Help or Reporting an Issue

To report bugs/issues/feature requests, please file an [issue](../../issues).

## How to Contribute

If you would like to contribute, please see our [CONTRIBUTING](./CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](./CODE_OF_CONDUCT.md). 
By participating in this project you agree to abide by its terms.

## License

    Copyright 2018 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
