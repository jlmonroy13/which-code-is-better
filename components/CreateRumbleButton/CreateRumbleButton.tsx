"use client";
import { getCurrentWeek } from "@/utils/date";
import useSWRMutation from "swr/mutation";

const postData = (url: string, { arg }: { arg: object }) => {
  return fetch(url, {
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
};

const rumbleData = {
  title: "Switch vs. If-Else22",
  snippets: [
    {
      code: `function performAction(actionType, actionValue) {
  switch (actionType) {
    case "add":
      console.log("Adding 10:", 10 + actionValue);
      break;
    case "subtract":
      console.log("Subtracting 5:", actionValue - 5);
      break;
    case "greet":
      console.log("Hello,", actionValue);
      break;
    default:
      console.log("Unknown action type.");
      break;
  }
}

// Example usage:
performAction("add", 15); // Output: Adding 10: 25
performAction("subtract", 20); // Output: Subtracting 5: 15
performAction("greet", "Selvio"); // Output: Hello, Selvio
performAction("jump"); // Output: Unknown action type.
`,
      language: "javascript",
    },
    {
      code: `function performAction(actionType, actionValue) {
  if (actionType === "add") {
    console.log("Adding 10:", 10 + actionValue);
  } else if (actionType === "subtract") {
    console.log("Subtracting 5:", actionValue - 5);
  } else if (actionType === "greet") {
    console.log("Hello,", actionValue);
  } else {
    console.log("Unknown action type.");
  }
}

// Example usage:
performAction("add", 15); // Output: Adding 10: 25
performAction("subtract", 20); // Output: Subtracting 5: 15
performAction("greet", "Selvio"); // Output: Hello, Selvio
performAction("jump"); // Output: Unknown action type.
`,
      language: "javascript",
    },
  ],
};

const CreateRumbleButton = () => {
  const { trigger } = useSWRMutation("/api/rumble", postData);

  const onClick = async () => {
    trigger({
      ...rumbleData,
      rumbleWeek: getCurrentWeek(),
    });
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
