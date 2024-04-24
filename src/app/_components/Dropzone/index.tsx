import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const fetchEndpoint = async () => {
  const res = await fetch("http://localhost:3000/api/get/history");
  return res.json();
};

const postEndpoint = async (data: File) => {
  const res = await fetch("http://localhost:3000/api/post/history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  return res.json();
};

const MyDropzone = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(async (file) => {
      // const reader = new FileReader();
      // reader.onabort = () => console.log("file reading was aborted");
      // reader.onerror = () => console.log("file reading has failed");
      // reader.onload = () => {
      //   // Do whatever you want with the file contents
      //   const binaryStr = reader.result;
      //   console.log(binaryStr);
      // };
      // reader.readAsArrayBuffer(file);
      // console.log("the file", file);
      // const response = await fetchEndpoint();
      const res = await postEndpoint(file);
      console.log("response", res);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
  });

  return (
    <div className={"dropzone"} {...getRootProps()}>
      <input {...getInputProps()} />
      <p
        className={
          "m-4 rounded-large border-2 border-dashed border-gray-500/50 p-7 hover:cursor-pointer hover:border-spotify"
        }
      >
        Drag 'n' drop some files here, or click to select files
      </p>
    </div>
  );
};

export default MyDropzone;
