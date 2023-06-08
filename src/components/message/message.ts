import controller from '../controller';

type Message = null | 'no-matches' | 'default';

function removeMessage() {
  const message = document.querySelector('.message__container') as HTMLDivElement;
  message.remove();
}

function createMessage(templateId: string, message: string, remove: boolean) {
  if (controller.currentMessageType) removeMessage();
  const cardsWrapper = document.querySelector('.goods') as HTMLDivElement;
  const template = document.querySelector(`#${templateId}`) as HTMLTemplateElement;
  const clone = template.content.cloneNode(true) as HTMLDivElement;
  const messageContainer = clone.querySelector(`.message__container`) as HTMLDivElement;
  const messageElement = clone.querySelector(`.message__text`) as HTMLParagraphElement;
  const messageTitle = clone.querySelector('.message__title') as HTMLParagraphElement;

  if (controller.language === 'en') messageTitle.textContent = 'system message';
  else messageTitle.textContent = 'системное сообщение';

  messageElement.textContent = message;
  if (cardsWrapper.querySelector('.main-message') == null) cardsWrapper.append(messageContainer);
  if (remove) {
    setTimeout(() => {
      messageContainer.remove();
      controller.currentMessageType = null;
    }, 4000);
  }
  scroll(0, cardsWrapper.scrollTop);
}

function showMessage(messageType: Message) {
  switch (messageType) {
    case 'no-matches':
      if (controller.language === 'en') createMessage('main-message', 'no matches found', false);
      else createMessage('main-message', 'совпадений не найдено', false);
      controller.currentMessageType = 'no-matches';
      break;
    default:
      if (controller.language === 'en') createMessage('main-message', 'Something went wrong...', false);
      else createMessage('main-message', 'Что-то пошло не так', false);
      controller.currentMessageType = 'default';
  }
}

export { Message, showMessage };
