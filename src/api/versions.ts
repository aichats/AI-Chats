export type v1 = 'v1'
export type v2 = 'v2'
export type v3 = 'v3'

export type CHAT_ID = string | null

export type supportedVersions = v1 | v2 | v3

export function apiUploadFile(
  chat_id: CHAT_ID,
  v: supportedVersions = 'v3',
): string {
  return `/chat/${chat_id}/upload/${v}`
}

export function apiCreateMsg(v: supportedVersions = 'v3'): string {
  return `/chat/${v}`
}
