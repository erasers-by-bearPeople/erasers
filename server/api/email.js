const nodemailer = require('nodemailer')



const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

const confEmail = (orderInfo) => {
  return  {
    from: 'ERASERS!ERASERS!ERASERS! <AllAboutErasers@gmail.com>',
    to: orderInfo.email,
    subject: 'Order Confirmation ',
    text:`Thank you for your order, ${orderInfo.name}! You'll receive another e-mail when your order ships`,
    html:`<p>Thank you for your order, ${orderInfo.name}! You'll receive another e-mail when your order ships</p>`
  }
}



module.exports = {confEmail, transporter}
