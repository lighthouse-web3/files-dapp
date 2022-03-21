import { FiFolder } from "react-icons/fi";
import { BsImage } from "react-icons/bs";
import { HiOutlineDocument } from "react-icons/hi";
import { VscFilePdf } from "react-icons/vsc";
import { FaFileAudio } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import { SiMicrosoftexcel } from "react-icons/si";

const imageExtensions = ["jpg", "jpeg", "png"];
const audioExtensions = ["m4a", "mp3", "flac", "wav", "aac"];
const videoExtensions = ["webm", "mp4", "mpeg", "ogg", "avi", "mov", "flv"];
const excelExtensions = ["xlsx", "ods", "xls"];
const docsExtensions = ["docx", "docm", "doc"];
const pdfExtensions = ["pdf"];

export const getFileIcon = (filename) => {
  let fileArr = filename.split(".");
  let fileExtension = fileArr?.[fileArr.length - 1];

  let icon = <FiFolder />;

  imageExtensions.includes(fileExtension) && (icon = <BsImage />);
  docsExtensions.includes(fileExtension) && (icon = <HiOutlineDocument />);
  pdfExtensions.includes(fileExtension) && (icon = <VscFilePdf />);
  audioExtensions.includes(fileExtension) && (icon = <FaFileAudio />);
  videoExtensions.includes(fileExtension) && (icon = <MdVideoLibrary />);
  excelExtensions.includes(fileExtension) && (icon = <SiMicrosoftexcel />);

  return icon;
};
