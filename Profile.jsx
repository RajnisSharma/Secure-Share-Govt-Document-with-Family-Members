import React, { useEffect, useState } from "react";
import { supabase } from "../client";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchUserProfile = async () => {
    try {
      const userData = supabase.auth.user();
      if (!userData) {
        alert("User is not logged in.");
        return;
      }

     
      const { data: profile, error } = await supabase
        .from("profiles") 
        .select("*")
        .eq("id", userData.id)
        .single();

      if (error) {
        throw error;
      }

      setUser(profile || userData); 
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("Failed to fetch user profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return <p>No user information available.</p>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-details">
        <p>
          <strong>Name:</strong> {user.name || "Not Provided"}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role || "User"}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(user.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Profile;
