namespace GuideRide.Services
{
    using System.Net;
    using System.Net.Mail;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;

    public class EmailSettings
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool EnableSsl { get; set; }
    }

    public class EmailService
    {
        private readonly SmtpClient _smtpClient;

        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            var settings = emailSettings.Value;

            _smtpClient = new SmtpClient(settings.Host)
            {
                Port = settings.Port,
                Credentials = new NetworkCredential(settings.Username, settings.Password),
                EnableSsl = settings.EnableSsl
            };
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var mailMessage = new MailMessage("chandrakantbhakare11a@gmail.com", toEmail, subject, body);
            await _smtpClient.SendMailAsync(mailMessage);
        }
    }

}
