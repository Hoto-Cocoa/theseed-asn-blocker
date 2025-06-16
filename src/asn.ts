import { addToAclGroup, readTextList } from '@/utils.js'
import { getAsnName, getAsnPrefixes } from '@/asn-utils.js'

(async function () {
  const list = await readTextList('asn')

  for (const asn of list) {
    if (!asn) {
      continue
    }

    const name = await getAsnName(asn)
    if (!name) {
      console.warn(`[WARN] No name found for ASN: AS${asn}`)

      continue
    }

    const note = `AS${asn}(${name})`
    console.log(`Processing ${note}`)

    const prefixes = await getAsnPrefixes(asn)
    if (!prefixes || prefixes.length === 0) {
      console.warn(`[WARN] No prefixes found for ${note}`)

      continue
    }

    console.log(`Adding prefixes for ${note} (${prefixes.length} prefixes)`)

    for (const prefix of prefixes) {
      try {
        await addToAclGroup(process.env.ASN_TARGET_ACLGROUP, prefix, note)
      }
      catch (error) {
        console.error(`[ERROR] Error adding prefix ${prefix}(${note}):`, error)
      }
    }

    console.log(`Finished processing ${note}`)
  }
})()
