﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WJ.PromoterSys.Web.Data.Extends
{
    /// <summary>
    /// des DBHelper
    /// author lingliang
    /// </summary>
    public class DbHelper
    {
        private static string connstring = ConfigurationManager.ConnectionStrings["PromoterDBContext"].ConnectionString;

        public static int ExecuteSqlCommand(string cmdTex)
        {
            using (DbConnection conn = new SqlConnection(connstring))
            {
                DbCommand cmd = new SqlCommand();
                PrepareCommand(cmd, conn, null, CommandType.Text, cmdTex, null);
                return cmd.ExecuteNonQuery();
            }
        }

        private static void PrepareCommand(DbCommand cmd, DbConnection conn, DbTransaction isOpenTrans, CommandType cmdType, string cmdText, DbParameter[] cmdParms)
        {
            if (conn.State != ConnectionState.Open)
                conn.Open();
            cmd.Connection = conn;
            cmd.CommandText = cmdText;
            if (isOpenTrans != null)
                cmd.Transaction = isOpenTrans;
            cmd.CommandType = cmdType;
            if (cmdParms != null)
            {
                cmd.Parameters.AddRange(cmdParms);
            }
        }
    }
}
