using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using Train_Web_Project.Models;

namespace Train_Web_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Registration")]
        public IActionResult Registration(User user)
        {
            try
            {
                string connectionString = _configuration.GetConnectionString("DefaultConnection");

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();

                    SqlCommand checkCmd = new SqlCommand("SELECT COUNT(*) FROM UserReg WHERE Email = @Email", conn);
                    checkCmd.Parameters.AddWithValue("@Email", user.Email);
                    int emailCount = (int)checkCmd.ExecuteScalar();

                    if (emailCount > 0)
                    {
                        return BadRequest(new { error = "Email already exists." });
                    }

                    SqlCommand cmd = new SqlCommand("usp_Registration", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@Password", user.Password);
                    cmd.Parameters.AddWithValue("@UserName", user.UserName);

                    int i = cmd.ExecuteNonQuery();
                    if (i > 0)
                    {
                        return Ok("User registered successfully.");
                    }
                    else
                    {
                        return BadRequest(new { error = "Error registering user." });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login(LoginRequest loginRequest)
        {
            try
            {
                string connectionString = _configuration.GetConnectionString("DefaultConnection");

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("usp_Login", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Email", loginRequest.Email);
                        cmd.Parameters.AddWithValue("@Password", loginRequest.Password);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                string userType = reader.GetString(reader.GetOrdinal("UserType"));

                                if (userType == "admin" || userType == "customer")
                                {
                                    return Ok(new { UserType = userType });
                                }
                                else
                                {
                                    return StatusCode(StatusCodes.Status401Unauthorized, "Invalid user type");
                                }
                            }
                            else
                            {
                                return Unauthorized("Invalid email or password");
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
