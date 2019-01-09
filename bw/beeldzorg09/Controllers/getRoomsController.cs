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
    public class getRoomsController: ApiController
    {
        public HttpResponseMessage Get(string userID,string token )
        {

            string SqlCommand = "SELECT rooms.id, rooms.name, rooms.type FROM linkaccountsrooms INNER JOIN rooms ON linkaccountsrooms.roomid = rooms.id where linkaccountsrooms.accountid='" + userID + "';";
            var result = new HttpResponseMessage();
            try
            {
                result.Content = new StringContent(dataAcces.GetJsonDataTable(SqlCommand));
            }
            catch (Exception e)
            {
                throw new Exception(e.ToString());
            }

            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return result;

        }
    }
}