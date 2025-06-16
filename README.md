## theseed-asn-blocker
theseed-asn-blocker is automated asn blocker for the seed engine compatible API.

## Installation
* Clone this repository.
* Execute `npm ci`.
* Copy `.env.example` to `.env` and fill in the required values.
* Create `asn.txt` and `vpn.txt`.
  * `asn.txt`: IDC ASN List, one per each line.
  * `vpn.txt`: VPN Prefix List, one per each line.

## Environment Variables
* `API_TOKEN` - the seed API Token, must have proper permission to add prefixes to ACL Group.
* `API_URL` - the seed API base URL. For example: `https://theseed.io`
* `API_HIDELOG` - Y/N, defaults N. You must have `aclgroup_hidelog` permission to enable this.
* `ASN_TARGET_ACLGROUP` - Target ACL Group name for ASN prefixes.
* `VPN_TARGET_ACLGROUP` - Target ACL Group name for VPN prefixes.

## Usage
* Execute `npm run asn` to block prefixes by ASN.
* Execute `npm run vpn` to block VPN prefixes.
* Execute `npm run vpngate` to block known VPNGATE address.

## License
AGPL-3.0, see [LICENSE](./LICENSE) file to more information.
