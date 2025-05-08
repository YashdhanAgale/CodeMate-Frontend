import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeSingleUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, skills, photoUrl } =
    user;

  console.log("This is user inside user card: ", user);
  console.log("This is id inside user card: ", _id);

  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeSingleUserFromFeed(_id));
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <div className="card bg-gray-200 w-96 shadow-sm">
        <figure>
          <img
            src={
              photoUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb9uUIkSMjnzfhM7xjBupWdPloejP3TVBgOg&s"
            }
            alt="Shoes"
          />
        </figure>
        <div className="card-body  items-center  ">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          {age && gender && (
            <p>{age + " years old" + "  " + "Gender:  " + gender}</p>
          )}

          {skills && (
            <p>
              <strong>Skills:</strong>{" "}
              {(Array.isArray(skills) ? skills : skills.split(","))
                .map((skill) => skill.trim())
                .filter((skill) => skill) // Remove empty strings
                .map((skill, index, arr) => (
                  <span key={index}>
                    {skill}
                    {index !== arr.length - 1 && ", "}
                  </span>
                ))}
            </p>
          )}

          <div
            className="card-actions justify-center my-4"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            <button className="btn btn-primary">Ignore</button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
