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
        public class delMessageController : ApiController
        {
            public HttpResponseMessage Get(string roomid, string messageID, string token)
            {
                string insert = "delete from messages where id='"+ messageID + "'";
                
                int rowsAffected = dataAcces.ExecuteQuery(insert);
                if (rowsAffected == 0)
                {
                    //todo no rows found, what to return
                    throw new Exception("message does not exist");
                }
                getRoomsController getRoomsController = new getRoomsController();
                return getRoomsController.Get(roomid, token);
            }

        }
        
    }