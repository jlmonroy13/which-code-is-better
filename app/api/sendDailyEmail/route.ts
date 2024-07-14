import { NextResponse } from "next/server";

interface VoteResult {
  codeSnippet: string;
  votes: number;
}

const fetchVoteResults = async (): Promise<VoteResult[]> => {
  // Replace with your logic to fetch vote results from your database
  return [
    { codeSnippet: "Code Snippet 1", votes: 100 },
    { codeSnippet: "Code Snippet 2", votes: 150 },
  ];
};

const sendEmail = async (results: VoteResult[]): Promise<void> => {
  const emailBody = `
    <h1>Daily Vote Results</h1>
    <p>Here are the results for today:</p>
    <ul>
      ${results
        .map(
          (result) => `<li>${result.codeSnippet} - ${result.votes} votes</li>`
        )
        .join("")}
    </ul>
  `;
  console.log('process.env.AUTH_RESEND_KEY', process.env.AUTH_RESEND_KEY)
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Which code is Better <${process.env.AUTH_RESEND_FROM_EMAIL}>`,
        to: "jlmonroy13@gmail.com, selvio89@hotmail.com",
        subject: "Daily Vote Results",
        html: emailBody,
      }),
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export async function GET() {
  const results = await fetchVoteResults();
  await sendEmail(results);
  return NextResponse.json({ message: "Email sent successfully" });
}
