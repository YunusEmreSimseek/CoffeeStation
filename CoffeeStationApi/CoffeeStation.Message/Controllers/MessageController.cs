using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace CoffeeStation.Message.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly ConnectionFactory connectionFactory;
        private readonly IConnection connection;

        private readonly IModel channel;

        public MessageController()
        {
            connectionFactory = new ConnectionFactory
            {
                HostName = "localhost",
                UserName = "guest",
            };
            connection = connectionFactory.CreateConnection();
            channel = connection.CreateModel();
        }

        [HttpPost]
        public IActionResult CreateMessage(string message)
        {
            //Kuyruk oluşturma
            channel.QueueDeclare("Queue1", false, false, false, arguments: null);
            // Mesaj içeriğini byte dizisine çevirme
            var byteMessageContent = Encoding.UTF8.GetBytes(message);
            //Mesaj gönderme
            channel.BasicPublish(
                exchange: "",
                routingKey: "Queue1",
                basicProperties: null,
                body: byteMessageContent
            );
            // Mesajın başarılı bir şekilde kuyruğa gönderildiğini bildirme
            return Ok("Your message has been queued");
        }


        [HttpGet]
        public IActionResult GetAllMessages()
        {   
            // Kuyruktaki tüm mesajları saklayacağımız bir liste
            var messages = new List<string>();
            // Kuyruktan mesajları almak için bir döngü oluşturduk
            while (true)
            {
                // Kuyruktan bir mesaj alın
                var result = channel.BasicGet(queue: "Queue1", autoAck: false);
                if (result == null)
                {
                    // Kuyrukta başka mesaj yoksa döngüyü kır
                    break;
                }
                // Mesajı byte dizisinden string'e çevir
                var message = Encoding.UTF8.GetString(result.Body.ToArray());
                messages.Add(message);
            }
            // Mesajlar listesinde hiç mesaj yoksa NoContent döndür
            if (messages.Count == 0)
            {
                return NoContent();
            }
            return Ok(messages);
        }
    }
}