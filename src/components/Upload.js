import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

const Upload = () => {
  const axios = require("axios").default;
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadURL =
    "https://s3.amazonaws.com/ai.powern.website.assets/cpms/files/0cdbba66-e69f-11ec-b67d-38f9d35753fb.png?AWSAccessKeyId=AKIATOSDO6VBUVAZPH6K&Signature=8hpQ9VOrTPNaFQUQEnajkzjpwaQ%3D&Expires=1654636733";
  const handleChangeStatus = ({ meta, remove }, status) => {
    console.log(status, meta);
  };

  const handleChange = (e) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (files) => {
    // const f = files[0];
    const fileReader = new FileReader();
    await fileReader.readAsArrayBuffer(files);
    console.log("fileReader", fileReader);
    console.log("handleSubmit", files);
    const blob = new Blob([fileReader.result], {
      type: files.type,
    });
    console.log("blob", blob);
    const blobName = files.name;
    const formData = new FormData();
    formData.append(blob, blobName);
    console.log("formData", formData);
    // PUT request: upload file to S3
    // const result = await fetch(uploadURL, {
    //   method: "PUT",
    //   body: files,
    // });
    const result = await axios.put(
      uploadURL,
      {
        data: files,
      },
      {
        headers: {
          "Content-Type": "",
        },
      }
    );
    console.log("result", result);
  };

  return (
    <>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Drop A File"
        styles={{
          dropzone: { width: 400, height: 200 },
          dropzoneActive: { borderColor: "green" },
        }}
      />
      <label htmlFor="file">Choose Your File</label>
      <input
        type="file"
        name="file"
        className="form-control inline"
        required
        onChange={handleChange}
      />
      <button onClick={() => handleSubmit(selectedFile)}>Submit</button>
    </>
  );
};

export default Upload;
