import { state } from './core'

let interval: NodeJS.Timer | null
const rootUrl = 'wss://ya-praktikum.tech/ws/chats/:userId/:chatId/:token'

class WebSocketService {
    socket: WebSocket;
    onMessage: Function
    onConnect: Function
    chatId: number

    constructor(userId: number, chatId: number, token: string, onMessage: Function, onConnect: Function) {
        const url = this.prepareUrl(userId, chatId, token)
        this.socket = new WebSocket(url)
        this.onMessage = onMessage
        this.onConnect = onConnect
        this.chatId = chatId
        this.init()
    }

    prepareUrl(userId: number, chatId: number, token: string) {
        return rootUrl
            .replace(':userId', userId.toString())
            .replace(':chatId', chatId.toString())
            .replace(':token', token)
    }

    init() {
        this.socket.addEventListener('open',
            () => {
                this.onConnect(this)
            });

        this.socket.addEventListener('close', event => {
            if (event.wasClean) {
            } else {
                alert('Ошибка соединения')
            }
        });

        this.socket.addEventListener('message', event => {
            const data = JSON.parse(event.data)
            if (data.type == 'ping' || data.type == 'pong') return
            this.onMessage(event.data)
        });

        this.socket.addEventListener('error', event => {
            alert('Ошибка соединения');
        });

        const pingMessage = JSON.stringify({
            type: 'ping'
        })
        
        if (state.webSocket) state.webSocket.socket.close()
        if (interval) clearInterval(interval)
        interval = setInterval(() => { this.socket.send(pingMessage) }, 10000)
    }

    send(message: string) {
        const processedMessage = JSON.stringify({
            content: message,
            type: 'message',
        });
        this.socket.send(processedMessage);
    }

    getOld(from: number = 0) {
        const processedMessage = JSON.stringify({
            content: from,
            type: 'get old',
        });
        this.socket.send(processedMessage);
    }
}

export default WebSocketService;