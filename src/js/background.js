import { ACTIONS } from './actions'
import { CONNECTIONS } from './connections'

let tabIds = []      // 最多允许两条记录 []

chrome.runtime.onConnect.addListener(function (port) {
    const { name } = port
    switch (name) {
        case CONNECTIONS.CONTENT_AND_BACKGROUND:
            port.onMessage.addListener(function (msg) {
                const { action, tabId, active } = msg

                switch (action) {
                    case ACTIONS.CHANGE_STATUS:
                        const theIndex = tabIds.indexOf(tabId)

                        while (active && tabIds.length >= 2) {
                            tabIds.splice(0, 1) //确保最多只会保留2个tab
                        }

                        if (active && theIndex < 0) {
                            tabIds.push(tabId)
                        } else if (!active && theIndex >= 0) {
                            tabIds.splice(theIndex, 1)
                        }

                        break
                    case ACTIONS.START_SYNC:
                        break
                    case ACTIONS.END_SYNC:
                        break
                    default:
                        break
                }

                console.log(tabIds)
            })
            break;

        default:
            break;
    }




})    