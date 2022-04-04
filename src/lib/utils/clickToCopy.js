export async function clickToCopy(node, text) {
  let target = node.currentTarget;
  try {
    await navigator.clipboard.writeText(text);
    target.dispatchEvent(new CustomEvent('copysuccess'));
  } catch (error) {
    target.dispatchEvent(new CustomEvent('copyerror'));
  }
}
