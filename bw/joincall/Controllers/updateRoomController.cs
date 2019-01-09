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
using Newtonsoft.Json;

namespace NettieBeeldbellen.Controllers
{
    public class updateRoomController : ApiController
    {
		
		 public static void AgainOnline(string conversationID)
        {
            //set old checkins on offline
            string CommandText = "select * from waitingqueue where status='offline'  AND id='" + conversationID + "';";
            DataTable datatable = dataAcces.GetDataTable(CommandText);
            foreach (DataRow row in datatable.Rows)
            {
                    string update = "UPDATE waitingqueue SET status = 'online' WHERE id='" + row["id"].ToString() + "';";
                    dataAcces.ExecuteQuery(update);
            }
           
        }
		
		
        public HttpResponseMessage Get(string conversationID)
        {
            // check valid conversationID
            if (conversationID == "" || conversationID == "undefinend" || conversationID == "null" || conversationID == "empty")
            {
                LogWriter.WriteToLog(1, "no conversationID. conversationID=" + conversationID, "3");

                throw new Exception("no conversationID");
            }
            DataTable datatable = dataAcces.GetDataTable("select * from waitingqueue where (status!='finished' AND id='" + conversationID + "') OR (status='started' AND id='" + conversationID + "')");
            if (datatable.Rows.Count == 0)
            {
                LogWriter.WriteToLog(1, "conversationID not found. conversationID=" + conversationID+".", "3");
                throw new Exception("conversationID not found");
            }





            AgainOnline(conversationID);
			


            string checkin = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");
            string update = "UPDATE waitingqueue SET checkin = '" + checkin + "' WHERE id='" + conversationID + "';";
            dataAcces.ExecuteQuery(update);
            // todo sequrity: use parameters and CMD

            var result = new HttpResponseMessage();
            try
            {
                string roomType = "";
                string roomID = "";
                 datatable = dataAcces.GetDataTable("select * from waitingqueue where id='" + conversationID + "'");
                foreach (DataRow row in datatable.Rows)
                {
                    roomID = row["roomid"].ToString();
                }
                datatable = dataAcces.GetDataTable("select * from rooms where id='" + roomID + "'");
                foreach (DataRow row in datatable.Rows)
                {
                    roomType = row["type"].ToString();
                }


                DataTable table = new DataTable();
                if (roomType == "appointment")
                {
                    string SqlCommand = "select clientname,conversationtoken,id,status, inline, roomtype, startdate, enddate from waitingqueue where id='" + conversationID + "' order by startdate;";
                     table = dataAcces.GetDataTable(SqlCommand);
                    string div = "0";
                    if (table.Rows.Count == 0)
                    {
                        throw new Exception("conversationID not found");
                    }
                    foreach (DataRow row in table.Rows)
                    {
                        //extra waitingtime
                        DateTime startdate = DateTime.Parse(row["startdate"].ToString());

                        SqlCommand = "select top 1 id, startdate, started from waitingqueue where roomid='" + roomID + "'  ";
                        SqlCommand = SqlCommand + "AND (status='started' OR status='finished') AND entered >= DATEADD(day, DATEDIFF(day, 0, GETDATE()), 0) AND entered < DATEADD(day, DATEDIFF(day, 0, GETDATE()), 1)";
                        SqlCommand = SqlCommand + "  order by started asc";
                        datatable = dataAcces.GetDataTable(SqlCommand);
                        foreach (DataRow row1 in datatable.Rows)
                        {
                            DateTime started = DateTime.Parse(row1["started"].ToString());
                            DateTime Ostartdate = DateTime.Parse(row1["startdate"].ToString());
                            TimeSpan timeDiff = started - Ostartdate;
                            Double a = timeDiff.TotalMinutes;
                            if (a>0)
                            {
                                //div = String.Format("{0}:{1}", timeDiff.Hours, timeDiff.Minutes).ToString();
                                div = timeDiff.TotalMinutes.ToString();
                            }
                        }

                        ///to do auto time zone
                        startdate = startdate.AddHours(1);
                      

                        row["inline"] = "Uw  afspraak van "+ startdate.ToString("MM-dd HH:mm") +" heeft een verwachte vertraging van  " + div +" min." ;
                        row["roomtype"] = "appointment";
                    }
                }
                else
                {
                    
                    string SqlCommand = "select clientname, conversationtoken,id,status, inline, roomtype from waitingqueue where id='" + conversationID + "' order by entered;";
                     table = dataAcces.GetDataTable(SqlCommand);
                    if (table.Rows.Count == 0)
                    {
                        throw new Exception("conversationID not found");
                    }
                    foreach (DataRow row in table.Rows)
                    {
                        //number in kine
                        int line = 0;

                        SqlCommand = "select id  from waitingqueue where roomid='" + roomID + "' ";
                        SqlCommand = SqlCommand + "AND (status='offline'OR status='online' ) AND entered >= DATEADD(day, DATEDIFF(day, 0, GETDATE()), 0) AND entered < DATEADD(day, DATEDIFF(day, 0, GETDATE()), 1)";
                        SqlCommand = SqlCommand + "  order by entered";
                        datatable = dataAcces.GetDataTable(SqlCommand);
                        foreach (DataRow row1 in datatable.Rows)
                        {
                            if (row1["id"].ToString() != conversationID)
                            {
                                line++;
                       
                            }
                            else { break; }
                        }

                        //see if doctor is online
                        bool useronline = false;
                        DateTime userCheckIn;
                        SqlCommand = "select userCheckIn from rooms where id='" + roomID + "' ";
                        datatable = dataAcces.GetDataTable(SqlCommand);
                        foreach (DataRow row1 in datatable.Rows)
                        {
                            if (DateTime.TryParse(row1["userCheckIn"].ToString(), out userCheckIn))
                            {
                                if (DateTime.Now.Subtract(userCheckIn).Minutes < 1)
                                {
                                    useronline = true;
                                }
                            }
                        }

                        if (useronline)
                        {
                            row["inline"] = "Wachtenden voor u: " + line.ToString();
                        }
                        else
                        {
                            row["inline"] = "Nog geen coach aanwezig.";
                        }

                        row["roomtype"] = "open";
                    }
                }
                result.Content = new StringContent(JsonConvert.SerializeObject(table));
            }
            catch (Exception e)
            {
                LogWriter.WriteToLog(1, "updatecontroller " + e.ToString(), "3");

                throw new Exception(e.ToString());
            }

            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return result;
        }
    }
}