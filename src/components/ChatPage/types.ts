export type Chat = {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
}

export type User = {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string,
}

export type Message = {
    content: string,
    id: number,
    time: string,
    type: string,
    user_id: number
}