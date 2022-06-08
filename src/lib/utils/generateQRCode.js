export async function generateQRCode(text, node) {
  const { default: QrCreator } = await import('qr-creator');
  return QrCreator.render(
    {
      text: text,
      radius: 0.5, // 0.0 to 0.5
      ecLevel: 'H', // L, M, Q, H
      fill: 'blue', // foreground color
      background: null, // color or null for transparent
      size: 250 // in pixels
    },
    node
  );
}
