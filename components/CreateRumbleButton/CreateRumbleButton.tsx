"use client";
import useSWRMutation from "swr/mutation";

const postData = (url: string, { arg }: { arg: object }) => {
  return fetch(url, {
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
};

const rumbleData = {
  snippets: [
    {
      code: `async function fetchUserData(userId) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/" + userId);
    const userData = await response.json();
    console.log(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};`,
      language: "javascript",
    },
    {
      code: `function fetchUserData(userId) {
  fetch("https://jsonplaceholder.typicode.com/users/" + userId)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((userData) => {
      console.log(userData);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
};`,
      language: "javascript",
    },
  ],
};

const CreateRumbleButton = () => {
  const { trigger } = useSWRMutation("/api/rumble", postData);

  const onClick = async () => {
    trigger(rumbleData);
  };

  return (
    <button
      className="z-50 w-fit bg-red-400 px-6 py-4 text-white"
      onClick={onClick}
    >
      Create rumble
    </button>
  );
};

export default CreateRumbleButton;
