import got, { ExtendOptions, Response, ResponseType } from 'got'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export async function fetch<T = unknown>(url: string, options: ExtendOptions = {}, contentType: ResponseType = 'json', authorizationEnabled: boolean = true): Promise<Response<T>> {
  options.headers = Object.assign({}, options.headers, {
    'Content-Type': 'application/json',
  })
  if (authorizationEnabled) {
    options.headers = Object.assign({}, options.headers, {
      authorization: `Bearer ${process.env.API_TOKEN}`,
    })
  }
  options.responseType = contentType
  options.retry = {
    limit: 3,
  }
  options.throwHttpErrors = false

  const response = await got(url, options) as Response<T>
  return response
}

export async function addToAclGroup(group: string, prefix: string, note: string): Promise<void> {
  const response = await fetch<{ id?: number, status?: string }>(`${process.env.API_URL}/api/v0/aclgroup`, {
    method: 'POST',
    body: JSON.stringify({
      group,
      ip: prefix,
      note,
      expire: '0',
      hidelog: process.env.API_HIDELOG ?? 'N',
      mode: 'ip',
    }),
  })

  if (response.statusCode !== 200) {
    if (response.body.status === 'aclgroup_already_exists') {
      return
    }

    throw new Error(response.body.status)
  }
}

export async function readTextList(name: string): Promise<string[]> {
  const list = await readFile(path.resolve(`${name}.txt`), 'utf-8')

  return list.split('\n').map(e => e.trim()).filter(String)
}
