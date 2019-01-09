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
    public class enterRoomController : ApiController
    {
        public HttpResponseMessage Get(string roomID, string clientname)
        {




            // check valid appointment
            if (roomID== "" )
            {
                throw new Exception("no roomID");
            }
            if (roomID == "" || roomID == "undefinend" || roomID == "null" || roomID == "empty" || roomID == null)
            {
                throw new Exception("no roomID");
            }
            DataTable datatable = dataAcces.GetDataTable("select * from rooms where id='" + roomID + "'");
            if (datatable.Rows.Count == 0)
            {
                throw new Exception("room not found");
            }


            removeOffline.removeOfflineNow();

            string conversationID = Guid.NewGuid().ToString();
            string conversationtoken = "";
            string entered = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");
            string status = "online";

            string insert = "INSERT INTO waitingqueue (checkin,roomID, clientname, entered, status, id, conversationtoken) VALUES('" + entered + "','" + roomID + "','"+ clientname + "','"+ entered + "','"+status+"','" + conversationID + "', '"+ conversationtoken + "'); ";
            dataAcces.ExecuteQuery(insert);

            updateRoomController updateRoomController = new updateRoomController();
            return updateRoomController.Get(conversationID);
        }

        

    }

    public static class removeOffline 
    {
        public static void removeOfflineNow()
        {
            //set old checkins on offline
            string snow = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");
            string CommandText = "select * from waitingqueue where status='online' OR status='offline'";
            DataTable datatable = dataAcces.GetDataTable(CommandText);
            foreach (DataRow row in datatable.Rows)
            {
                var diffInSeconds = (DateTime.Parse(snow) - DateTime.Parse(row["checkin"].ToString())).TotalSeconds;
                if (diffInSeconds > 30)
                {
                    //set old checkins on offline
                    string update = "UPDATE waitingqueue SET status = 'offline' WHERE id='" + row["id"].ToString() + "';";
                    dataAcces.ExecuteQuery(update);
                }
            }
            //delete very old checkins
            foreach (DataRow row in datatable.Rows)
            {
                var diffInSeconds = (DateTime.Parse(snow) - DateTime.Parse(row["checkin"].ToString())).TotalSeconds;
                if (diffInSeconds > 60)
                {
                    //delete very old checkins
                    string update = "delete from waitingqueue  WHERE id='" + row["id"].ToString() + "';";
                    dataAcces.ExecuteQuery(update);
                }
            }
        }
    }
}