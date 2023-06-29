export type v1 = "v1"
export type v2 = "v2"
export type v3 = "v3"



export function apiUploadFile (chat_id:string, v : v1|v2|v3 = "v3" ):string{
    return `/chat/${chat_id}/upload/${v}`
}

export function apiCreateMsg(v : v1|v2|v3 = "v3"):string{
    return `/chat/${v}`
}

