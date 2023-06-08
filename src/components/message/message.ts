import app from '../app';

type Message = null | 'no-matches' | 'default';

function removeMessage() {
  const message = document.querySelector('.message__container') as HTMLDivElement;
  message.remove();
}

function createMessage(templateId: string, message: string, remove: boolean) {
  if (app.currentMessageType) removeMessage();
  const cardsWrapper = document.querySelector('.goods') as HTMLDivElement;
  const template = document.querySelector(`#${templateId}`) as HTMLTemplateElement;
  const clone = template.content.cloneNode(true) as HTMLDivElement;
  const messageContainer = clone.querySelector(`.message__container`) as HTMLDivElement;
  const messageElement = clone.querySelector(`.message__text`) as HTMLParagraphElement;
  const messageTitle = clone.querySelector('.message__title') as HTMLParagraphElement;

  if (app.language === 'en') messageTitle.textContent = 'system message';
  else messageTitle.textContent = 'системное сообщение';

  messageElement.textContent = message;
  if (cardsWrapper.querySelector('.main-message') == null) cardsWrapper.append(messageContainer);
  if (remove) {
    setTimeout(() => {
      messageContainer.remove();
      app.currentMessageType = null;
    }, 4000);
  }
  scroll(0, cardsWrapper.scrollTop);
}

function showMessage(messageType: Message) {
  switch (messageType) {
    case 'no-matches':
      if (app.language === 'en') createMessage('main-message', 'no matches found', false);
      else createMessage('main-message', 'совпадений не найдено', false);
      app.currentMessageType = 'no-matches';
      break;
    default:
      if (app.language === 'en') createMessage('main-message', 'Something went wrong...', false);
      else createMessage('main-message', 'Что-то пошло не так', false);
      app.currentMessageType = 'default';
  }
}

export { Message, showMessage };
