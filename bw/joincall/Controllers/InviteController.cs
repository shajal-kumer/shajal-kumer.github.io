using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace NettieBeeldbellen.Controllers
{

    public class InviteController : ApiController
    {
        public HttpResponseMessage Get(string contact, string message)
        {
            string type = "mail";
            switch (type)
            {
                case "sms":
                    {
                        break;
                    }
                case "whatsapp":
                    {
                        break;
                    }
                default:
                    {
                        //mail
                        Email.Send(contact, "invite", message);
                        break;
                   }
            }
            var result = new HttpResponseMessage();
            result.Content = new StringContent("{\"response\": \"ok\"}");
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return result;

        }
    }
}