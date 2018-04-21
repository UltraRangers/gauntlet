import { createTransport } from 'nodemailer';
import { join } from 'path';

let transporter;
let config;

const init = () => {
  try {
    const configPath = join(process.cwd(), 'config', 'server', 'email-config.js');
    config = require(configPath);
    transporter = createTransport(config);
  } catch (error) {
    console.log('error', error);
  }
};

const sendMail = async () => {
  if (!transporter) {
    init();
  }
  await transporter.sendMail({
    to: 'johnmichaelubas.santos@gmail.com',
    from: config.auth.user,
    subject: 'Ultra Rangers',
    text: 'Hello Test Email',
    html: '<h1> Hello World </h1>'
  });
  console.log('mail sent');
};

sendMail();
