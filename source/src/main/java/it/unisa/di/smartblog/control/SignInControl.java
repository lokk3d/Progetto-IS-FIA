package it.unisa.di.smartblog.control;

import it.unisa.di.smartblog.filter.Error;
import it.unisa.di.smartblog.filter.Message;
import it.unisa.di.smartblog.security.JWTHandler;
import it.unisa.di.smartblog.user.CredentialsException;
import it.unisa.di.smartblog.user.User;
import it.unisa.di.smartblog.user.UserManager;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet(name="SignInControl",
        value="/api/login")
public class SignInControl extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        UserManager um = new UserManager();
        try {
            User user = um.auth(email,password);
            JWTHandler jwt = new JWTHandler();
            String message = jwt.createJWT(user.getEmail());

            request.setAttribute("response", new Message(message));
        } catch (SQLException throwables) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            request.setAttribute("response", new Error("User not found"));
        } catch (CredentialsException e) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            request.setAttribute("response", new Error(e.getMessage()));
        }

    }

}