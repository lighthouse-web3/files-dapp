import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isFocused) {
        return '#2196f3';
    }
    return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

function Dropzone({ setUploadedFiles }) {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        acceptedFiles,
        onDropAccepted
    } = useDropzone({ accept: 'image/*' });

    // setUploadedFiles(acceptedFiles)
    // console.log(getInputProps);

    function getEvent(e) {
        setUploadedFiles(e);
      //console.log(e)
    };



    return (
        <div className="container">

            <input type="file" onChange={e => getEvent(e)} />
        </div>
    );
}

export default Dropzone;