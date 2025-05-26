import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeSingleRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeSingleRequest(_id));
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (requests === null || requests.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="font-bold text-3xl text-red-500 text-center">
          No Requests Found!!!
        </h1>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-10 bg-gray-50 min-h-screen">
      <h1 className="font-bold text-4xl text-center text-gray-800 mb-12">
        User Requests
      </h1>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((request, index) => {
          const {
            _id,
            firstName,
            lastName,
            age,
            gender,
            photoUrl,
            skills,
            about,
          } = request.fromUserId;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 p-6 flex flex-col items-center text-center"
            >
              <img
                className="h-28 w-28 rounded-full object-cover mb-4 border-4 border-indigo-200"
                src={
                  photoUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn5aytU2bHnVPCsgfKLPxObZwFIdte5rjFGA&s"
                }
                alt="User"
              />

              <h2 className="text-xl font-semibold text-gray-900">
                {firstName} {lastName}
              </h2>
              {age && <p className="text-gray-500">{age} years old</p>}
              {gender && <p className="text-gray-500 capitalize">{gender}</p>}
              {about && (
                <p className="text-gray-600 mt-2 text-sm px-2">{about}</p>
              )}

              {skills && (
                <p className="text-sm text-gray-700 mt-3">
                  <span className="font-medium text-gray-800">Skills:</span>{" "}
                  {Array.isArray(skills)
                    ? skills.join(", ")
                    : skills.split(" ").join(", ")}
                </p>
              )}

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => reviewRequests("rejected", request._id)}
                  className="px-4 py-2 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition-all"
                >
                  Reject
                </button>
                <button
                  onClick={() => reviewRequests("accepted", request._id)}
                  className="px-4 py-2 bg-green-100 text-green-600 font-semibold rounded-lg hover:bg-green-200 transition-all"
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
