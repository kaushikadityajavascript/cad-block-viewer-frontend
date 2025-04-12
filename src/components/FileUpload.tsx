import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FileUpload = ({ onUpload }: { onUpload: (fileId:string,blocks:any[]) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef= useRef<HTMLInputElement | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8080/api/files/upload", formData);
    const { file: uploadedFile, blocks } = response.data.data;

      toast.success("✅ File uploaded successfully");
      setFile(null); 
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }
      onUpload(uploadedFile.id, blocks);
    } catch (err: any) {
      if (err.response?.status === 409) {
        toast.error("⚠️ Duplicate file: A file with the same name already exists.");
      } else {
        toast.error("❌ Upload failed. Please try again.");
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Upload CAD File</h2>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
