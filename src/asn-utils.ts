import { fetch } from '@/utils.js'

export type IpGuideAsnResponse = {
  asn: string
  name: string
  country: string
  organization: string
  rir: string
  routes: {
    v4: string[]
    v6: string[]
  }
}

export async function getAsnName(asn: string): Promise<string> {
  try {
    const response = await fetch<IpGuideAsnResponse>(`https://ip.guide/AS${asn}`, {}, 'json', false)

    return response.body.name
  }
  catch (error) {
    console.error(`Error fetching name for AS${asn}:`, error.code)

    return ''
  }
}

export async function getAsnPrefixes(asn: string): Promise<string[]> {
  try {
    const response = await fetch<IpGuideAsnResponse>(`https://ip.guide/AS${asn}`, {}, 'json', false)

    return [...response.body.routes.v4, ...response.body.routes.v6]
  }
  catch (error) {
    console.error(`Error fetching prefixes for AS${asn}:`, error.code)

    return []
  }
}
