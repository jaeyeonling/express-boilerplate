const mailer = require('nodemailer')

const config = require('../../config')

//
//
//

const send = async ({
  to,
  subject,
  text
}) => {
  const transporter = mailer.createTransport(config.smtp.transport)

  await transporter.sendMail({
    to,
    subject: `[${config.application.name}] ${subject}`,
    text
  })
}

//
//
//

module.exports = {
  send
}
