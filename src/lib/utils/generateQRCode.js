export async function generateQRCode(text, size = 230) {
  const { default: kjua } = await import('kjua');
  return kjua({
    text,
    fill: 'blue',
    rounded: 100,
    size
  });
}
