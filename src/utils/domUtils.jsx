export const updateContent = (content, elementId = 'target-element') => {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = content;
    } else {
      console.warn(`Element with id '${elementId}' not found`);
    }
  };