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
    public class addMessageController : ApiController
    {
        public HttpResponseMessage Get(string roomid, string messageText, string token)
        {
            string id = Guid.NewGuid().ToString();
          

            string insert = "INSERT INTO messages (id, messagetext, roomid) VALUES('" + id + "','" + messageText + "','" + roomid + "'); ";
            dataAcces.ExecuteQuery(insert);

            getRoomsController getRoomsController = new getRoomsController();
            return getRoomsController.Get(roomid, token);

        }
    }
}

