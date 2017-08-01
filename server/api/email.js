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
    from: 'Erasers!Eraser!Erasers! <AllAboutErasers@gmail.com>',
    to: orderInfo.email,
    subject: 'Order Confirmation ',
    text:`Thank you for your order, ${orderInfo.name}! You'll receive another e-mail when your order ships`,
    html:`<p>Thank you for your order, ${orderInfo.name}! You'll receive another e-mail when your order ships</p>`
  }
}

const shipEmail = (orderInfo) => {
  return  {
    from: 'Erasers!Eraser!Erasers! <AllAboutErasers@gmail.com>',
    to: orderInfo.email,
    subject: 'Order Shipped',
    text:`We're please to inform you your eraser order has shipped! Tracking info not available due to delivery by drone. You're welcome`,
    html:`<p>We're please to inform you your eraser order has shipped! Tracking info not available due to delivery by drone. You're welcome</p>`
  }
}


module.exports = {confEmail, transporter, shipEmail}
