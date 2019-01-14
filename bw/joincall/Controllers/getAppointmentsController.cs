﻿using System;
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
    public class getAppointmentsController : ApiController
    {
        public HttpResponseMessage Get(string userEmail, string token)
        {

            string SqlCommand = "SELECT id, clientname, startDate, endDate where userEmail='" + userEmail + "' ";
            SqlCommand = SqlCommand + "AND startDate >= DATEADD(day, DATEDIFF(day, 0, GETDATE()), 0) AND startDate < DATEADD(day, DATEDIFF(day, 0, GETDATE()), 1)";

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