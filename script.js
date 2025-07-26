const qrContainer = document.getElementById("qrCode");
const downloadBtn = document.getElementById("downloadBtn");
const copyBtn = document.getElementById("copyBtn");
const input = document.getElementById("qrInput");

function generateQRCode() {
  const value = input.value.trim();
  qrContainer.innerHTML = "";
  downloadBtn.disabled = true;
  copyBtn.disabled = true;

  if (value === "") {
    alert("Please enter some text or a URL");
    return;
  }

  QRCode.toCanvas(value, { width: 250 }, (err, canvas) => {
    if (err) return console.error(err);
    qrContainer.appendChild(canvas);
    downloadBtn.disabled = false;
    copyBtn.disabled = false;
  });
}

function downloadQR() {
  const canvas = qrContainer.querySelector("canvas");
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "qr-code.png";
  link.click();
}

function copyQR() {
  const canvas = qrContainer.querySelector("canvas");
  canvas.toBlob(blob => {
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]);
    alert("QR Code copied to clipboard!");
  });
}
