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
  const { trigger } = useSWRMutation("/api/rumble", postData);

  const onClick = async () => {
    trigger({
      ...rumbleData,
      rumbleWeek: "2025-W3",
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
