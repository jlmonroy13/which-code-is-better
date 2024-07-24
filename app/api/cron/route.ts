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

const sendEmail = async (
  recipient: string,
  results: VoteResult[]
): Promise<void> => {
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

  try {
    console.log('recipient', recipient);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Which code is Better <${process.env.AUTH_RESEND_FROM_EMAIL}>`,
        to: recipient,
        subject: "Daily Vote Results",
        html: emailBody,
      }),
    });

    const responseBody = await response.json();

    if (!response.ok) {
      console.error(
        "Email sending failed with status",
        response.status,
        responseBody
      );
      throw new Error(`Email sending failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export async function GET() {
  const results = await fetchVoteResults();
  const recipients = ["jlmonroy13@gmail.com", "selvio89@hotmail.com"];

  try {
    await Promise.all(
      recipients.map((recipient) => sendEmail(recipient, results))
    );
    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to send some emails",
      error: error,
    });
  }
}
