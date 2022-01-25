// /* global self, window */
// // eslint-disable-next-line @typescript-eslint/triple-slash-reference
// /// <reference types="office-js-preview" />

// import { global } from 'core-js'

// Office.onReady(() => {
//   // If needed, Office.js is ready to be called
// })

// /**
//  * Shows a notification when the add-in command is executed.
//  * @param event
//  */
// function action (event: Office.AddinCommands.Event) {
//   const message: Office.NotificationMessageDetails = {
//     type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
//     message: 'Performed action.',
//     icon: 'Icon.80x80',
//     persistent: true
//   }

//   // Show a notification message
//   if (Office.context.mailbox.item) {
//     Office.context.mailbox.item.notificationMessages.replaceAsync('action', message)
//     // Office.context.mailbox.item.notificationMessages.replaceAsync("action", message);
//   }

//   // Be sure to indicate when the add-in command function is complete
//   event.completed()
// }

// function getGlobal () {
//   return typeof self !== 'undefined'
//     ? self
//     : typeof window !== 'undefined'
//       ? window
//       : typeof global !== 'undefined'
//         ? global
//         : undefined
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const g = getGlobal() as any

// // The add-in command functions need to be available in global scope
// g.action = action
