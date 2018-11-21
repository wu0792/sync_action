import { ACTIONS } from './actions'
import { CONNECTIONS } from './connections'

let config = new Map()

chrome.runtime.onConnect.addListener(function (port) {
    const { name } = port
    switch (name) {
        case CONNECTIONS.CONTENT_AND_BACKGROUND:
            port.onMessage.addListener(function (msg) {
                console.log(msg)

                console.log('before update.')
                console.log(config)

                const { action, tabId, value } = msg

                if (!config.has(tabId)) {
                    config.set(tabId, { active: false, main: false })
                }

                switch (action) {
                    case ACTIONS.CHANGE_ACTIVE:
                        config.set(tabId, { ...config.get(tabId), active: value })
                        break
                    case ACTIONS.CHANGE_AS_MAIN_WINDOW:
                        config.set(tabId, { ...config.get(tabId), main: value })
                        break
                    default:
                        break
                }

                console.log('after update.')
                console.log(config)
            })
            break;

        default:
            break;
    }




})    