import React, { useState, useEffect } from 'react'
import { ACTIONS } from './actions'
import { CONNECTIONS } from './connections';

const connContentAndBackground = chrome.runtime.connect({ name: CONNECTIONS.CONTENT_AND_BACKGROUND })

function sendMessage(data) {

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0]
    connContentAndBackground.postMessage({ tabId: activeTab.id, ...data })
  })
}

const Popup = () => {
  let [active, setActive] = useState(false)
  let [asMainWindow, setAsMainWindow] = useState(false)

  useEffect(() => {
    sendMessage({ action: ACTIONS.CHANGE_ACTIVE, value: active })
  }, [active])

  useEffect(() => {
    sendMessage({ action: ACTIONS.CHANGE_AS_MAIN_WINDOW, value: asMainWindow })
  }, [asMainWindow])

  return (
    <React.Fragment>
      <div>
        <label htmlFor="active">是否激活：</label>
        <label>
          <input type="checkbox" name="active" id="active" checked={active} onChange={_ => setActive(!active)} />
        </label>
      </div>

      <div>
        <label htmlFor="isMainWindow">是否主窗口：</label>
        <label>
          <input type="checkbox" name="isMainWindow" id="isMainWindow" checked={asMainWindow} onChange={_ => setAsMainWindow(!asMainWindow)} />
        </label>
      </div>
    </React.Fragment>
  )
}

export {
  Popup
}