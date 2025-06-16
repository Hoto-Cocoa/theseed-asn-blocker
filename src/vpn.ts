import { addToAclGroup, readTextList } from '@/utils.js'

(async function () {
  const prefixes = await readTextList('vpn')

  console.log(`Adding prefixes for VPN (${prefixes.length} prefixes)`)

  for (const prefix of prefixes) {
    try {
      await addToAclGroup(process.env.VPN_TARGET_ACLGROUP, prefix, `VPN`)
    }
    catch (error) {
      console.error(`Error adding prefix ${prefix}(VPN):`, error)
    }
  }
})()
