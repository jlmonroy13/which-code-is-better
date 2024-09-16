"use client";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

import { getCurrentWeek } from "@/utils/date";

const postData = (url: string, { arg }: { arg: object }) => {
  return fetch(url, {
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
};

const rumbleData = {
  title: "Positional Arguments vs. Object Destructuring",
  snippets: [
    {
      code: `function createUser(firstName, lastName, age) {
  console.log(\`User Created: \${firstName} \${lastName}, Age: \${age}\`);
}

createUser("John", "Doe", 30);
`,
      language: "jsx",
    },
    {
      code: `function createUser({ firstName, lastName, age }) {
  console.log(\`User Created: \${firstName} \${lastName}, Age: \${age}\`);
}

createUser({ firstName: "John", lastName: "Doe", age: 30 });
`,
      language: "jsx",
    },
  ],
};

const CreateRumbleButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { trigger } = useSWRMutation("/api/rumble", postData);

  const onClick = async () => {
    setIsLoading(true);
    try {
      const result = await trigger({
        ...rumbleData,
        rumbleWeek: getCurrentWeek(),
      });
      console.log("Rumble created:", result);
      // You might want to add some user feedback here, like a toast notification
    } catch (error) {
      console.error("Error creating rumble:", error);
      // Add error handling, perhaps show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="z-50 w-fit bg-red-400 px-6 py-4 text-white disabled:bg-gray-400"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? "Creating..." : "Create rumble"}
    </button>
  );
};

export default CreateRumbleButton;
