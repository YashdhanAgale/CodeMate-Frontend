

import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections === null || connections.length === 0)
    return (
      <h1 className="font-bold text-2xl text-red-600 text-center my-10">
        No Connections Found!!!
      </h1>
    );
  return (
    <div className="flex flex-wrap justify-center gap-6 my-10">
      <h1 className="font-bold text-3xl text-center w-full mb-6">
        Connections
      </h1>
      {connections.map((connection, index) => {
        const { firstName, lastName, age, gender, photoUrl, skills, about } =
          connection;
        return (
          <div
            key={index}
            className="max-w-sm rounded-lg shadow-xl p-6 bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
