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

  useEffect(() => sendMessage({ action: ACTIONS.CHANGE_STATUS, active }))

  return (
    <React.Fragment>
      <div>
        <label htmlFor='active'>是否激活：</label>
        <input type='checkbox' id='active' name='active' checked={active} onChange={ev => setActive(ev.target.checked)} />
      </div>

      <button id='btnStart' onClick={() => sendMessage({ action: ACTIONS.START_SYNC })}>开始</button>
      <button id='btnEnd' onClick={() => sendMessage({ action: ACTIONS.END_SYNC })}>结束</button>
    </React.Fragment>
  )
}

export {
  Popup
}