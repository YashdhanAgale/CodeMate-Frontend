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
      <div>
        <h1 className="font-bold text-3xl text-red-500  text-center py-10">
          No Requests Found!!!
        </h1>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-6 my-10">
        <h1 className="font-bold text-3xl text-center w-full mb-6">Requests</h1>
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
              className="max-w-sm flex justify-between w-2/3 items-center rounded-lg shadow-xl p-6 bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <img
                  className="h-32 w-32 rounded-full object-cover"
                  src={
                    photoUrl ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn5aytU2bHnVPCsgfKLPxObZwFIdte5rjFGA&s"
                  }
                  alt="user image"
                />
              </div>

              <div className="text-center">
                <h1 className="text-xl font-semibold text-gray-800">
                  {firstName} {lastName}
                </h1>
                {age && <h2 className="text-gray-500">{age} years old</h2>}
                {gender && <h2 className="text-gray-500">{gender}</h2>}
              </div>

              <div className="mt-4">
                {about && <p className="text-gray-600 text-sm">{about}</p>}

                {skills && (
                  <p className="mt-2 text-sm text-gray-700">
                    Skills:{" "}
                    {Array.isArray(skills)
                      ? skills.join(", ")
                      : skills.split(" ").join(", ")}
                  </p>
                )}
              </div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
