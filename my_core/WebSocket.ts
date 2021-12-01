// import Store from "../modules/store";
// import constants from "../constants";
import { state } from './core'

let interval = null
const rootUrl = 'wss://ya-praktikum.tech/ws/chats/:userId/:chatId/:token';

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
                console.log('Соединение установлено');
                this.onConnect(this)
            });

        this.socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
                alert('Ошибка соединения')
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        this.socket.addEventListener('message', event => {
            console.log('Получены данные', event.data);
            const data = JSON.parse(event.data)
            if (data.type == 'ping' || data.type == 'pong') return
            this.onMessage(event.data)
        });

        this.socket.addEventListener('error', event => {
            console.log('Ошибка', event);
            alert('Ошибка соединения');
        });

        const pingMessage = JSON.stringify({
            type: 'ping'
        })
        
        if (state.webSocket) state.webSocket.socket.close()
        if (interval) clearInterval(interval)
        interval = setInterval(() => { this.socket.send(pingMessage); console.log('PING', this.chatId) }, 10000)
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