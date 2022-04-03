export function clickToCopy(node, text) {
  async function copyText() {
    let textToCopy = text ? text : node.innerText;

    try {
      await navigator.clipboard.writeText(textToCopy);

      node.dispatchEvent(
        new CustomEvent('copysuccess', {
          bubbles: true
        })
      );
    } catch (error) {
      node.dispatchEvent(
        new CustomEvent('copyerror', {
          bubbles: true,
          detail: error
        })
      );
    }
  }

  node.addEventListener('click', copyText);

  return {
    destroy() {
      node.removeEventListener('click', copyText);
    }
  };
}
