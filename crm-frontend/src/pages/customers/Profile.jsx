import { useEffect, useState } from "react";
import { getProfile } from "../../services/customerService";

export default function Profile() {
  const email = localStorage.getItem("email");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    getProfile(email)
      .then((data) => {
        setProfile(data);
        
      })
      .catch((err) => {
        console.error("Profile error:", err);
        setProfile(null);
      })
      .finally(() => setLoading(false));
  }, [email]);

  if (loading) return <h3>Loading profile...</h3>;

  if (!profile) return <h3>No profile data found</h3>;

  return (
    <div className="profile-box">
      <h2>My Profile</h2>

      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
    </div>
  );
}