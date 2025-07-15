const Event = require('../models/Event');
const RSVP = require('../models/RSVP');
const nodemailer = require('nodemailer');
const moment = require('moment');

// ✅ SendGrid Transporter
const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});
const sendReminderEmails = async () => {
  const now = moment();

  try {
    const events = await Event.find();

    for (const event of events) {
      const start = moment(event.startTime);
      const daysDiff = start.diff(now, 'days');
      const minutesDiff = start.diff(now, 'minutes');

      const attendees = await RSVP.find({ event: event._id }).populate('user');

      // ✅ 1 Day Before Reminder
      if (daysDiff === 1 && !event.dayBeforeReminderSent) {
        for (const rsvp of attendees) {
          await transporter.sendMail({
            to: rsvp.user.email,
            from: 'yagnasri2828@gmail.com',
            subject: `⏰ Reminder: ${event.name} is Tomorrow`,
            html: `<p>Hi ${rsvp.user.name},<br/>Your event <strong>${event.name}</strong> is tomorrow at ${start.format('LLLL')}.</p>`,
          });
        }

        event.dayBeforeReminderSent = true;
        await event.save();
        console.log(`✅ Day-before reminder sent for "${event.name}"`);
      }

      // ✅ 1 Hour Before Reminder (range: 59–61 min)
      if (minutesDiff <= 61 && minutesDiff >= 59 && !event.oneHourBeforeReminderSent) {
        for (const rsvp of attendees) {
          await transporter.sendMail({
            to: rsvp.user.email,
            from: 'yagnasri2828@gmail.com',
            subject: `⏳ Reminder: ${event.name} starts in 1 hour`,
            html: `<p>Hi ${rsvp.user.name},<br/><strong>${event.name}</strong> starts in 1 hour at ${start.format('LLLL')}.</p>`,
          });
        }

        event.oneHourBeforeReminderSent = true;
        await event.save();
        console.log(`✅ 1-hour reminder sent for "${event.name}"`);
      }
    }
  } catch (error) {
    console.error('❌ Reminder Error:', error.message);
  }
};

module.exports = sendReminderEmails;
