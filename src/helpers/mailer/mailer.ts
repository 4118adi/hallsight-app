import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
const prisma = new PrismaClient();
// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "83561a45d89958",
      pass: "c75ef337846f05"
    }
  });
export const sendEmail =async({email, emailType, userId}:any)=>{
    try {
        console.log("mailer called")
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === "verify") {
            const token = await prisma.user.update({
                where: { id: userId },
                data: {
                    verifyToken: hashedToken,
                    verifyTokenExpiration: new Date(Date.now() + 3600000) 
                 },
            });
        }   else if (emailType === "reset") {
                const token = await prisma.user.update({
                    where: { id: userId },
                    data: {
                        forgotPasswordToken: hashedToken,
                        forgotPasswordTokenExpiration: new Date(Date.now() + 3600000) 
                    },
                });
        };

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "83561a45d89958",
            pass: "c75ef337846f05"
            }
        });
        const info = await transporter.sendMail({
            from: 'adi@adi.ai', // sender address
            to: email, // list of receivers
            subject: emailType === "verify" ? "Verify your email" : "Reset your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verify?token=${hashedToken}">here</a> to ${emailType === "verify" ? "verify your account." : "reset your password."}</p>`, // Use backticks for template literals
        });
        
        return info;
    } catch (error:any) {
        throw new Error(error.message);
    }
}
