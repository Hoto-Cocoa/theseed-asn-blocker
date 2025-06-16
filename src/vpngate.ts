import { addToAclGroup, fetch } from '@/utils.js'

(async function () {
  const prefixes = await getVpnGateServers()

  console.log(`Adding prefixes for VPNGATE (${prefixes.length} prefixes)`)

  for (const prefix of prefixes) {
    try {
      await addToAclGroup(process.env.VPN_TARGET_ACLGROUP, prefix, `VPN(VPNGATE)`)
    }
    catch (error) {
      console.error(`Error adding prefix ${prefix}(VPNGATE):`, error)
    }
  }
})()

async function getVpnGateServers(): Promise<string[]> {
  try {
    const response = await fetch<string>(`https://www.vpngate.net/api/iphone/`, {}, 'text', false)

    const csvData = response.body
    const lines = csvData.split('\n')
    lines.shift()
    lines.shift()
    lines.pop()
    lines.pop()
    const servers: string[] = []
    for (const line of lines) {
      const columns = line.split(',')
      if (columns.length > 0) {
        const server = columns[1].trim()
        if (server) {
          servers.push(server)
        }
      }
    }

    return servers
  }
  catch (error) {
    console.error('Error fetching VPNGATE servers:', error)

    return []
  }
}
