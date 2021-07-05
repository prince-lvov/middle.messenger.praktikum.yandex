import { chatHeader } from '../ChatHeader/index'
import { messagesBody } from '../MessagesBody/index'
import { inputArea } from '../InputArea/index'
import { messagesArea } from '../MessagesArea/index'
import '../ChatMessage/index'
import { popup } from '../Popup/index'

messagesArea.mountTo('main')
chatHeader.mountTo(messagesArea)
inputArea.mountTo(messagesArea)
messagesBody.mountTo(messagesArea)

popup.mountTo('.main-view')