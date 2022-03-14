import * as nodemailer from 'nodemailer';
import {
  MAIL_AUTH_PASSWORD,
  MAIL_AUTH_USER,
  MAIL_SERVICE,
} from './enviroments';

export const emailTransporter = nodemailer.createTransport({
  service: MAIL_SERVICE,
  port: 465,
  secure: true,
  auth: {
    user: MAIL_AUTH_USER,
    pass: MAIL_AUTH_PASSWORD,
  },
});

emailTransporter
  .verify()
  .then(() => console.log('Ready to send emails'))
  .catch(() => console.log("can't send email"));

export function sendMail(message: any) {
  return new Promise((resolve, reject) => {
    emailTransporter.sendMail(message, function (err, info) {
      if (err) reject(err);
      else resolve(info);
    });
  });
}
