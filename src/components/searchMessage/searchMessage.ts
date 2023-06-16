import app from '../app';

type SearchMessage = null | 'no-matches' | 'default';

function removeMessage() {
  const message = document.querySelector('.search-message__container') as HTMLDivElement;
  message.remove();
}

function createMessage(templateId: string, message: string, remove: boolean) {
  if (app.currentMessageType) removeMessage();
  const cardsWrapper = document.querySelector('.goods') as HTMLDivElement;
  const template = document.querySelector(`#${templateId}`) as HTMLTemplateElement;
  const clone = template.content.cloneNode(true) as HTMLDivElement;
  const messageContainer = clone.querySelector(`.search-message__container`) as HTMLDivElement;
  const messageElement = clone.querySelector(`.search-message__text`) as HTMLParagraphElement;
  const messageTitle = clone.querySelector('.search-message__title') as HTMLParagraphElement;

  if (app.language === 'en') messageTitle.textContent = 'system message';
  else messageTitle.textContent = 'системное сообщение';

  messageElement.textContent = message;
  if (cardsWrapper.querySelector('.search-message') == null) cardsWrapper.append(messageContainer);
  if (remove) {
    setTimeout(() => {
      messageContainer.remove();
      app.currentMessageType = null;
    }, 4000);
  }
  scroll(0, cardsWrapper.scrollTop);
}

function showMessage(messageType: SearchMessage) {
  switch (messageType) {
    case 'no-matches':
      if (app.language === 'en') createMessage('search-message', 'no matches found', false);
      else createMessage('search-message', 'совпадений не найдено', false);
      app.currentMessageType = 'no-matches';
      break;
    default:
      if (app.language === 'en') createMessage('search-message', 'Something went wrong...', false);
      else createMessage('search-message', 'Что-то пошло не так', false);
      app.currentMessageType = 'default';
  }
}

export { SearchMessage, showMessage };
