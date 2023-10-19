import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "verify") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "reset") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NEXT_PUBLIC_MAIL_USER,
        pass: process.env.NEXT_PUBLIC_MAIL_PASS,
      },
    });

    const mailOptions = {
      from: "sanjeev@gmail.com",
      to: email,
      subject:
        emailType === "verify" ? "Verify your email" : "Reset your password",
      html: `
        <div>
          <h2>Click the link below to ${
            emailType === "verify" ? "verify your email" : "reset your password"
          }</h2>
          <a href="${process.env.NEXT_PUBLIC_DOMAIN}/${
        emailType === "verify" ? "verifyemail" : "resetpassword"
      }?token=${hashToken}">Click here</a>
          <br>
            <p>Or copy and paste this link in your browser</p>
            <p>${
              process.env.NEXT_PUBLIC_DOMAIN
            }/verifyemail?token=${hashToken}</p>
            
        </div>
        `,
    };

    const mailres = await transport.sendMail(mailOptions);

    return mailres;
  } catch (error) {
    throw new Error(error.message);
  }
};
