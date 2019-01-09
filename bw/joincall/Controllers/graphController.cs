

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
using Newtonsoft.Json;

namespace NettieBeeldbellen.Controllers
{
    public class graphController : ApiController
    {
        public HttpResponseMessage Get(string startdate, string enddate, string group, string total)
        {
             startdate = startdate.Substring(6, 4)  + "-"+startdate.Substring(3, 2) + "-" + startdate.Substring(0, 2)  ;
            enddate = enddate.Substring(6, 4) + "-" + enddate.Substring(3, 2) + "-" + enddate.Substring(0, 2);
            string startdate1 = startdate;
            string enddate1 = enddate;

            string SqlCommand = "";

            if (total == "0")
            { 
                SqlCommand = "delete from calls where dummy=1";
                dataAcces.ExecuteQuery(SqlCommand);
            

            //get all conversatos since yesterday and where status started or finsihed
            SqlCommand = " select * from waitingqueue where(status = 'finished' or status = 'started') ";
            SqlCommand = SqlCommand + "AND started < DATEADD(day, DATEDIFF(day, 0, GETDATE()), 0) ";
            DataTable datatable1 = dataAcces.GetDataTable(SqlCommand);
            foreach (DataRow row in datatable1.Rows)
            {
                string id = row["id"].ToString();
                string clientname = row["clientname"].ToString();
                string roomid = row["roomid"].ToString();
                string entered = DateTime.Parse(row["entered"].ToString()).ToString("yyyy-MM-dd HH:mm:ss");
                string status = row["status"].ToString();
                string started = DateTime.Parse(row["started"].ToString()).ToString("yyyy-MM-dd HH:mm:ss");
                string appointmentID = row["appointmentID"].ToString();
                //insert
                SqlCommand = "INSERT INTO calls (clientname, roomid, entered, status, started, appointmentID,id) VALUES('" + clientname + "', '" + roomid + "','" + entered + "','" + status + "','" + started + "', '" + appointmentID + "', '" + Guid.NewGuid().ToString() + "'); ";
                dataAcces.ExecuteQuery(SqlCommand);
                //delete
                SqlCommand = "delete from waitingqueue where id='" + id + "'";
                dataAcces.ExecuteQuery(SqlCommand);
            }

            SqlCommand = " select distinct roomid from calls ";
            datatable1 = dataAcces.GetDataTable(SqlCommand);
            foreach (DataRow row in datatable1.Rows)
            {
                string roomid = row["roomid"].ToString();

                    startdate = startdate1;
                while (DateTime.Parse(enddate) >= DateTime.Parse(startdate))
                {
                    SqlCommand = "INSERT INTO calls (dummy,roomid, started,id) VALUES('1','" + roomid + "','" + startdate + "', '" + Guid.NewGuid().ToString() + "'); ";
                    dataAcces.ExecuteQuery(SqlCommand);

                    startdate = DateTime.Parse(startdate).AddDays(1).ToString("yyyy-MM-dd");
                    }


            }

            }


            if (total == "0")
                SqlCommand = "SELECT roomid, CAST(COUNT(Convert(date, [started])) AS int)-1 as total, Convert(date, [started]) as datum FROM calls";
          else
               SqlCommand = "SELECT roomid, COUNT(Convert(date, [started])) as total FROM calls";


            DateTime testdate;
            if (DateTime.TryParse(startdate, out testdate) && DateTime.TryParse(enddate, out testdate))
            {
                startdate = DateTime.Parse(startdate).ToString("yyyy-MM-dd");
                enddate = DateTime.Parse(enddate).ToString("yyyy-MM-dd");

                SqlCommand = SqlCommand + " where '" + startdate1 + "' < [started] AND [started] < '" + enddate1 + "'";
            }
            else
            {
                //no valid date
            }
            if (total == "0")
                SqlCommand = SqlCommand + "  GROUP BY [roomid] , Convert(date, [started]) order by roomid, Convert(date, [started])";
            else
                SqlCommand = SqlCommand + " AND dummy is null GROUP BY [roomid] order by roomid";


            DataTable datatable = dataAcces.GetDataTable(SqlCommand);

            var result = new HttpResponseMessage();
            try
            {
                result.Content = new StringContent(JsonConvert.SerializeObject(datatable));
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
