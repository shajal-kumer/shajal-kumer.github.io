using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Data;

namespace NettieBeeldbellen.Controllers
{
    public class startConversationController : ApiController
    {
        public HttpResponseMessage Get(string conversationID, string token)
        {
            string conversationtoken = Guid.NewGuid().ToString();
            string status = "started";
            string started = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");
            string update = "UPDATE waitingqueue SET started='"+ started + "', status='" + status + "' , conversationtoken = '" + conversationtoken + "' WHERE id='" + conversationID + "';";
            dataAcces.ExecuteQuery(update);



            DataTable datatable = dataAcces.GetDataTable("select * from waitingqueue where id='" + conversationID + "'");
            foreach (DataRow row in datatable.Rows)
            {
                string appointmentID = row["appointmentID"].ToString();
                update = "UPDATE appointments SET status='" + status + "'  WHERE id='" + appointmentID + "';";
                dataAcces.ExecuteQuery(update);
            }

            



                string SqlCommand = "select conversationtoken,status from waitingqueue where id='" + conversationID + "';";
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