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
    public class enterAppointmentRoomController : ApiController
    {
        public HttpResponseMessage Get(string appoinmentID)
        {
            removeOffline.removeOfflineNow();

            // check valid appointment
            DataTable datatable = dataAcces.GetDataTable("select * from appointments where status!='finished' AND externalAppointmentID='" + appoinmentID + "'");
            if (datatable.Rows.Count==0)
            {
                throw new Exception("appointment not found");
            }

            // check already finsihed appointment
             datatable = dataAcces.GetDataTable("select * from appointments where status='finished' AND externalAppointmentID='" + appoinmentID + "'");
            if (datatable.Rows.Count == 1)
            {
                throw new Exception("appointment already finsihed");
            }


            //get userID, start end time
            string userEmail = "";
            string startDate = "";
            string endDate = "";
            string userID = "";
            string roomID = "";
            string clientname = "";
             datatable = dataAcces.GetDataTable("select * from appointments where externalAppointmentID='" + appoinmentID + "'");
            foreach (DataRow row in datatable.Rows)
            {
                userEmail = row["userEmail"].ToString();
                startDate = row["startDate"].ToString();
                endDate = row["endDate"].ToString();
                clientname = row["clientname"].ToString();
            }
            datatable = dataAcces.GetDataTable("select * from accounts where email='" + userEmail + "'");
            foreach (DataRow row in datatable.Rows)
            {
                userID = row["id"].ToString();
            }

            
            datatable = dataAcces.GetDataTable("select * from linkaccountsrooms where accountid='" + userID + "'");
            foreach (DataRow row in datatable.Rows)
            {
                string temproomID = row["roomid"].ToString();
                datatable = dataAcces.GetDataTable("select * from rooms where id='" + temproomID + "' AND type='appointment'");
                
                    foreach (DataRow row1 in datatable.Rows)
                    {
                        roomID = row1["id"].ToString();
                    }
                         }

            if (roomID == "")
            {
                throw new Exception("appointment not found");
            }


            string conversationID = Guid.NewGuid().ToString();
            string conversationtoken = "";
            string entered = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");
            string status = "online";

            string insert = "INSERT INTO waitingqueue (startDate,checkin,appointmentID, roomID, clientname, entered, status, id, conversationtoken) VALUES('"+ startDate + "','" + entered + "','" + appoinmentID + "','" + roomID + "','" + clientname + "','" + entered + "','" + status + "','" + conversationID + "', '" + conversationtoken + "'); ";
            dataAcces.ExecuteQuery(insert);

            updateRoomController updateRoomController = new updateRoomController();
            return updateRoomController.Get(conversationID);
        }
    }
}