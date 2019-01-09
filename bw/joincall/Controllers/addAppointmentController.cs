using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace NettieBeeldbellen.Controllers
{
    public class addAppointmentController : ApiController
    {
        public HttpResponseMessage Get(string userEmail, string clientname, string clientid, string appointmentID, string startDateUTC, string endDateUTC)
        {
            DataTable datatable = dataAcces.GetDataTable("select * from accounts where email='" + userEmail + "'");
            if (datatable.Rows.Count == 0)
            {
                //email does not exist
                //todo how to respond?
                throw new Exception("email does not exist");
            }
            datatable = dataAcces.GetDataTable("select * from appointments where externalAppointmentID='" + appointmentID + "'");
            if (datatable.Rows.Count > 0)
            {
                //not unique ID
                //todo how to respond?
                throw new Exception("not unique ID");
            }



            string id = Guid.NewGuid().ToString();
            DateTime sstartDate = DateTime.Parse(startDateUTC);
            DateTime sendDate = DateTime.Parse(endDateUTC);

            string insert = "INSERT INTO appointments (status, userEmail, clientname, clientid, externalAppointmentID, startDate, endDate, id) VALUES('plannend','" + userEmail + "','" + clientname + "','"+ clientid + "','" + appointmentID + "','" + startDateUTC + "','" + endDateUTC + "', '" + id + "'); ";
            dataAcces.ExecuteQuery(insert);

            string SqlCommand = "select externalAppointmentID from appointments where externalAppointmentID='" + appointmentID + "' ";
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