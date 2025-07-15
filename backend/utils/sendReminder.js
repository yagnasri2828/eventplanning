const sendReminderEmails = require('../cron/reminderJob');

// Run once on start
console.log('📨 Initial reminder check...');
sendReminderEmails();

// Then run every 10 minutes
setInterval(() => {
  console.log('🔁 Checking for event reminders...');
  sendReminderEmails();
}, 10 * 60 * 1000); // Every 10 minutes
