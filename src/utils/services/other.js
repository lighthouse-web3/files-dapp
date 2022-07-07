import { notify } from "./notification";

export const bytesToString = (bytes) => {
  // function takes in bytes and returns corresponding string value with suitable Prefix (KB,MB,GB)
  let incrementor = 0;
  let size = bytes;
  do {
    incrementor++;
    size = size / 1024;
  } while (size >= 1024);

  let prefix = "";
  incrementor === 0 && (prefix = "B");
  incrementor === 1 && (prefix = "KB");
  incrementor === 2 && (prefix = "MB");
  incrementor === 3 && (prefix = "GB");

  return size.toFixed(2) + " " + prefix;
};

export const copyToClipboard = (text) => {
  // Allows user to copy the given text on clipboard
  navigator.clipboard.writeText(text);
  notify("Copied To Clipboard", "success");
};


export const downloadFileFromURL = async (url, filename = "untitled") => {
  await fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    })
    .catch(console.error);
};