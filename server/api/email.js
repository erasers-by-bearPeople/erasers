const nodemailer = require('nodemailer')

module.exports = sendEmail

const sendEmail = () => {
  let transpoerter = nodemailer.createTransport({
    service: 'gmail',
    auth: {

    }
  })

  let mailOptions = {
    from: 'ERASERS!ERASERS!ERASERS! <TalkinBoutErasers@gmail.com>',
    to: userCheckout.email,
    subject: "Order Confirmation ",
    text:`Thank you for your order, ${userCheckout.name}! You'll receive another e-mail when your order ships`,
    html:`<p>Thank you for your order, ${userCheckout.name}! You'll receive another e-mail when your order ships</p>`
  }

  transpoerter.sendMail(mailOptions, (error, info) => {
    if(error) {
      return console.log('Email error ', error)
    }
    console.log('Message %s send: %s', info.messageId, info.response)
  })

}
