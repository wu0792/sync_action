/*global chrome:true*/

import React, { useState, useEffect } from 'react'

function sendMessage(data) {
  debugger
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0]
    chrome.tabs.sendMessage(activeTab.id, data)
  })
}

const Popup = () => {
  let [active, setActive] = useState(false)
  let [asMainWindow, setAsMainWindow] = useState(false)

  useEffect(() => {
    sendMessage({ action: 'changeActive', value: active })
  }, [active])

  useEffect(() => {
    sendMessage({ action: 'changeAsMainWindow', value: asMainWindow })
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