import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Contact Form <onboarding@contact.thecommunitytable>",
      to: ["thecommunitytable@protonmail.com"],
      subject: "Contact us message from community table",
      replyTo: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
