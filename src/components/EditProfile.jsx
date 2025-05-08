import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          skills,
          photoUrl,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data)); // ✅ Update Redux state
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="h-screen overflow-y-auto flex justify-center mx-10">
        <div className="card card-border bg-base-200 w-96">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            <div className="py-4">
              {/* First Name */}
              <div className="mb-4">
                <label htmlFor="firstName" className="block mb-1 font-medium">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <label htmlFor="lastName" className="block mb-1 font-medium">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Photo URL */}
              <div className="mb-4">
                <label htmlFor="photoUrl" className="block mb-1 font-medium">
                  Photo URL
                </label>
                <input
                  id="photoUrl"
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Age */}
              <div className="mb-4">
                <label htmlFor="age" className="block mb-1 font-medium">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Gender */}
              <div className="mb-4">
                <label htmlFor="gender" className="block mb-1 font-medium">
                  Gender
                </label>
                <input
                  id="gender"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Skills */}
              <div className="mb-4">
                <label htmlFor="skills" className="block mb-1 font-medium">
                  Skills
                </label>
                <input
                  id="skills"
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* About */}
              <div className="mb-4">
                <label htmlFor="about" className="block mb-1 font-medium">
                  About
                </label>
                <textarea
                  id="about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="textarea textarea-bordered w-full"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={saveProfile}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserCard
        user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
      />

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Your Profile Updated Successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
