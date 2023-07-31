import { Resend } from "resend";
export async function POST(request: Request) {
  const resend = new Resend(`re_KuoCiSdV_3a7j199BLwogBiEvfcy5T6Zh`);
  const id = request;

  resend.emails.send({
    from: `onboarding@resend.dev`,
    to: `devs@gridoai.com`,
    subject: `Hello World`,
    html: `<p>Congrats on sending your <strong>first email</strong>!</p>`,
  });
}
