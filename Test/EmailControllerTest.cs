
    //using global::GuideRide.Services;
    //using GuideRide.Services;
    //using Microsoft.AspNetCore.Mvc;
    //using Moq;
    //using System.Threading.Tasks;
    //using Xunit;

    //namespace GuideRide.Tests.Controllers
    //{
    //    public class EmailControllerTests
    //    {
    //        [Fact]
    //        public async Task SendConfirmationEmail_ReturnsOkResult_WithConfirmationMessage()
    //        {
    //            // Arrange
    //            var mockEmailService = new Mock<EmailService>();
    //            var emailDto = new EmailDto { Email = "test@example.com" };
    //            var controller = new EmailController(mockEmailService.Object);

    //            // Act
    //            var result = await controller.SendConfirmationEmail(emailDto);

    //            // Assert
    //            var okResult = Assert.IsType<OkObjectResult>(result);
    //            var response = Assert.IsType<dynamic>(okResult.Value);
    //            Assert.Equal("Confirmation email sent.", (string)response.message);

    //            mockEmailService.Verify(service => service.SendEmailAsync(
    //                emailDto.Email, "Registration Successful", "Thank you for registering with us."), Times.Once);
    //        }
    //    }
    //}

