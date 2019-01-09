using Newtonsoft.Json;
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
    public class getWaitingQueueController : ApiController
    {
        public HttpResponseMessage Get(string roomID, string token)
        {
            removeOffline.removeOfflineNow();

            string update = "UPDATE rooms SET userCheckIn = '"+ DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss") + "' WHERE id='" + roomID + "';";
            dataAcces.ExecuteQuery(update);



            string roomType = "";
            DataTable datatable = dataAcces.GetDataTable("select * from rooms where id='" + roomID + "'");
            foreach (DataRow row in datatable.Rows)
            {
                roomType = row["type"].ToString();
            }
            string SqlCommand = "";
            if (roomType == "appointment")
            {
                string email = "";
                string accountid = "";
                SqlCommand = "select* from linkaccountsrooms where roomid = '" + roomID + "'";
                DataTable table1 = dataAcces.GetDataTable(SqlCommand);
                foreach (DataRow row in table1.Rows)
                {
                    accountid = row["accountid"].ToString();
                }
                SqlCommand = "select* from accounts where id = '" + accountid + "'";
                DataTable table3 = dataAcces.GetDataTable(SqlCommand);
                foreach (DataRow row2 in table3.Rows)
                {
                    email = row2["email"].ToString();
                }

                SqlCommand = "SELECT appointments.startDate as startDate, conversationtoken,waitingqueue.id as id,appointments.clientname as clientname,entered, ISNULL(waitingqueue.status, 'plannend') as status FROM appointments LEFT JOIN waitingqueue ON appointments.externalAppointmentID = waitingqueue.appointmentID where userEmail = '" + email + "'";
                SqlCommand = SqlCommand + "AND appointments.startDate >= DATEADD(day, DATEDIFF(day, 0, GETDATE()), 0) AND appointments.startDate < DATEADD(day, DATEDIFF      (day, 0, GETDATE()), 1) ORDER BY startDate ASC";
            }
            else
            {
                SqlCommand = "select conversationtoken,id,clientname,entered,status from waitingqueue where roomid='" + roomID + "' ";
                SqlCommand = SqlCommand + "AND entered >= DATEADD(day, DATEDIFF(day, 0, GETDATE()), 0) AND entered < DATEADD(day, DATEDIFF      (day, 0, GETDATE()), 1) ORDER BY entered ASC";
            }
            var result = new HttpResponseMessage();

            DataTable table = new DataTable();
            //try
            {
                table = dataAcces.GetDataTable(SqlCommand);
                foreach (DataRow row in table.Rows)
                {
                    if (row["entered"].ToString()!="")
                    { 
                        DateTime entered = DateTime.Parse( row["entered"].ToString());
                        ///to do auto time zone
                        entered = entered.AddHours(1);
                        row["entered"] = entered.ToString("HH:mm");
                    }
                    if (roomType == "appointment" && row["startDate"].ToString() != null)
                    {
                        DateTime startDate = DateTime.Parse(row["startDate"].ToString());
                        ///to do auto time zone
                        startDate = startDate.AddHours(1);
                        row["startDate"] = startDate.ToString("HH:mm");
                    }
                }
                result.Content = new StringContent(JsonConvert.SerializeObject(table));
            }
            //catch (Exception e)
            {
              //  throw new Exception(e.ToString());
            }

            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return result;

        }
    }
}