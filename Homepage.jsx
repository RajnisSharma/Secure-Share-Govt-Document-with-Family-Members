import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";

const Homepage = ({ token }) => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    if (!token) {
      alert("Please log in to access this page.");
      navigate("/");
    }
  }, [token, navigate]);

  
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from("documents")
        .list("public");
      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
      alert("Failed to fetch documents.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      alert("Logged out successfully!");
      navigate("/");
    } catch (err) {
      alert(`Error logging out: ${err.message}`);
    }
  };

  
  const handleDelete = async (fileName) => {
    try {
      const { error } = await supabase.storage
        .from("documents")
        .remove([`public/${fileName}`]);
      if (error) throw error;
      alert("Document deleted successfully.");
      fetchDocuments();
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete document.");
    }
  };

  
  const handleShare = async (fileName) => {
    try {
      const { publicURL, error } = supabase.storage
        .from("documents")
        .getPublicUrl(`public/${fileName}`);
      if (error) throw error;
      alert(`Share this link: ${publicURL}`);
    } catch (error) {
      console.error("Error sharing document:", error);
      alert("Failed to generate shareable link.");
    }
  };

 
  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div>
      <nav className="navbar">
        <h2 className="h2">Secure & Share Govt Document</h2>
        <ul className="nav-links">
          <li>
            <Link to="/upload">Upload Doc</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <section className="welcome-section">
        <h1>Welcome to Home Page</h1>
        <p>Enjoy managing your documents!</p>
      </section>

      <section className="documents-section">
        <h2>Uploaded Documents</h2>
        {loading ? (
          <p>Loading documents...</p>
        ) : documents.length === 0 ? (
          <p>No documents uploaded yet.</p>
        ) : (
          <table border="1">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.name}>
                  <td>{doc.name}</td>
                  <td>
                    <button onClick={() => handleShare(doc.name)}>Share</button>
                    <button onClick={() => handleDelete(doc.name)}>
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        alert("Update functionality not implemented yet.")
                      }
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default Homepage;
