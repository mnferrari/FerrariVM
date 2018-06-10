using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace Evaluacion2
{
    public class Connections
    {
        static string DatabaseConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultDataConnectionString"].ConnectionString;


        public void AddUser(string Name, string LastName, string Email, string Password)
        {
            using (SqlConnection conn = new SqlConnection(DatabaseConnectionString))
            {
                var StoredProcedure = "uspAddUser";

                SqlCommand cmd = new SqlCommand(StoredProcedure, conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@Name", SqlDbType.VarChar).Value = Name;
                cmd.Parameters.Add("@LastName", SqlDbType.VarChar).Value = LastName;
                cmd.Parameters.Add("@Email", SqlDbType.VarChar).Value = Email;
                cmd.Parameters.Add("@Password", SqlDbType.VarChar).Value = Password;

                cmd.Connection.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public  void DeleteUser(int Id)
        {
            using (SqlConnection conn = new SqlConnection(DatabaseConnectionString))
            {
                var StoredProcedure = "uspDeleteUser";

                SqlCommand cmd = new SqlCommand(StoredProcedure, conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@Id", SqlDbType.VarChar).Value = Id;

                cmd.Connection.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void UpdateUser(int Id, string Name, string LastName, string Email, string Password)
        {
            using (SqlConnection conn = new SqlConnection(DatabaseConnectionString))
            {
                var StoredProcedure = "uspUpdateUser";

                SqlCommand cmd = new SqlCommand(StoredProcedure, conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@Id", SqlDbType.Int).Value = Id;
                cmd.Parameters.Add("@Name", SqlDbType.VarChar).Value = Name;
                cmd.Parameters.Add("@LastName", SqlDbType.VarChar).Value = LastName;
                cmd.Parameters.Add("@Email", SqlDbType.VarChar).Value = Email;
                cmd.Parameters.Add("@Password", SqlDbType.VarChar).Value = Password;

                cmd.Connection.Open();
                cmd.ExecuteNonQuery();
            }
        }


        public List<Object> GetResourcesList()
        {
            using (SqlConnection conn = new SqlConnection(DatabaseConnectionString))
            {
                var StoredProcedure = "uspGetUsersList";

                SqlCommand cmd = new SqlCommand(StoredProcedure, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                var list = new List<object>();

                while (reader.Read())
                {
                    list.Add(new
                    {
                        Id = (int)reader["Id"],
                        Name = (string)reader["Name"],
                        LastName = (string)reader["LastName"],
                        Email = (string)reader["Email"],
                        Password = (string)reader["Password"]
                    });
                }

                return list;
            }
        }
    }
}