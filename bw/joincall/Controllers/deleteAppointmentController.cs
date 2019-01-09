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

    public class deleteAppointmentController : ApiController
    {
        public HttpResponseMessage Get(string appointmentID)
        {
            string insert = "delete from appointments where externalAppointmentID='" + appointmentID + "'";
            int rowsAffected = dataAcces.ExecuteQuery(insert);
            var result = new HttpResponseMessage();
            if (rowsAffected > 0)
            {
                string SqlCommand = "select externalAppointmentID from appointments where externalAppointmentID='~' ";

                try
                {
                    result.Content = new StringContent(dataAcces.GetJsonDataTable(SqlCommand));
                }
                catch (Exception e)
                {
                    throw new Exception(e.ToString());
                }
            }
            else
            {
                //todo no rows found, what to return
                throw new Exception("appointment does not exist");
            }
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return result;

        }
    }
}