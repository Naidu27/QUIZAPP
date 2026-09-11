import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
const { user, logout } = useAuth();
const navigate = useNavigate();

const [file, setFile] = useState(null);
const [uploading, setUploading] = useState(false);
const [message, setMessage] = useState("");
const [uploadedFileUrl, setUploadedFileUrl] = useState("");

useEffect(() => {
if (!user) {
navigate("/signin");
}
}, [user, navigate]);

if (!user) {
return null;
}

const handleUpload = async () => {
if (!file) {
setMessage("Please select a file first.");
return;
}


setUploading(true);
setMessage("");
setUploadedFileUrl("");

try {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "https://myquizzappweb-gvcfatbngzeufze0.southindia-01.azurewebsites.net/api/files/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "File upload failed");
  }

  setMessage("File uploaded successfully!");
  setUploadedFileUrl(data.blobUrl);
} catch (error) {
  console.error("Upload error:", error);
  setMessage(error.message || "File upload failed.");
} finally {
  setUploading(false);
}


};

return ( <div className="max-w-md mx-auto mt-20 px-6 py-8 bg-white/70 backdrop-blur-md shadow-lg rounded-3xl text-center space-y-6"> <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">
👋 Hello, {user.username} </h1>

  <div className="text-left bg-white/60 rounded-xl p-4 shadow-inner border border-gray-200">
    <p className="text-gray-700 mb-3">
      <span className="font-semibold">🆔 User ID:</span> {user.id}
    </p>

    <p className="text-gray-700">
      <span className="font-semibold">🙍 Username:</span>{" "}
      {user.username}
    </p>
  </div>

  <div className="bg-white/60 rounded-xl p-4 shadow-inner border border-gray-200">
    <h2 className="text-xl font-bold text-blue-700 mb-4">
      ☁️ Upload File
    </h2>

    <input
      type="file"
      onChange={(e) => {
        setFile(e.target.files[0]);
        setMessage("");
        setUploadedFileUrl("");
      }}
      className="w-full text-sm mb-4"
    />

    <button
      onClick={handleUpload}
      disabled={uploading}
      className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 disabled:opacity-50 text-white px-6 py-2 rounded-full shadow-lg transition duration-200"
    >
      {uploading ? "Uploading..." : "Upload to Azure"}
    </button>

    {message && (
      <p className="mt-4 text-sm font-semibold text-gray-700">
        {message}
      </p>
    )}

    {uploadedFileUrl && (
      <a
        href={uploadedFileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-3 text-blue-600 underline break-all"
      >
        View uploaded file
      </a>
    )}
  </div>

  <button
    onClick={() => {
      logout();
      navigate("/signin");
    }}
    className="mt-6 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-6 py-2 rounded-full shadow-lg transition duration-200 ease-in-out"
  >
    🚪 Logout
  </button>
</div>

);
};

export default Profile;
