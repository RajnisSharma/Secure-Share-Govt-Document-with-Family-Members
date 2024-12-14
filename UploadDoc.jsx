import React, { useState } from "react";
import { supabase } from "../client";

const UploadDoc = ({ refreshDocs }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(""); // Clear any previous messages
  };

  const uploadDocument = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    setUploading(true);

    try {
      const { data, error } = await supabase.storage
        .from("documents") // Name of your Supabase storage bucket
        .upload(`public/${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      setMessage("File uploaded successfully!");
      refreshDocs(); // Refresh the documents list
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload Document</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadDocument} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadDoc;
