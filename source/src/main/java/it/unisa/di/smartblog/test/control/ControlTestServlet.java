package it.unisa.di.smartblog.test.control;

import it.unisa.di.smartblog.review.Review;
import it.unisa.di.smartblog.review.ReviewDao;
import it.unisa.di.smartblog.test.TestListener;
import it.unisa.di.smartblog.test.review.ReviewDaoTest;
import it.unisa.di.smartblog.test.user.UserDaoTest;
import junit.framework.Test;
import junit.framework.TestSuite;
import junit.textui.TestRunner;
import org.junit.runner.JUnitCore;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/test/control")
public class ControlTestServlet extends HttpServlet{

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        PrintWriter pw = response.getWriter();

        JUnitCore runner = new JUnitCore();
        runner.addListener(new TestListener(pw));
        runner.run(suite(pw));

    }




    public static Test suite(PrintWriter pw){

        TestSuite suite = new TestSuite();

        suite.addTest(AddReviewControlTest.suite(pw));
        suite.addTest(CreateSpecControlTest.suite(pw));
        suite.addTest(ReviewInspectionControlTest.suite(pw));
        suite.addTest(SignUpControlTest.suite(pw));
        suite.addTest(ProfileControlTest.suite(pw));
        suite.addTest(SpecControlTest.suite(pw));
        suite.addTest(SignInControlTest.suite(pw));
        suite.addTest(ReviewControlTest.suite(pw));
        suite.addTest(AllSpecControlTest.suite(pw));
        suite.addTest(SearchControlTest.suite(pw));

        suite.addTest(DeleteSpecControlTest.suite(pw));
        suite.addTest(SetSpecScoreControlTest.suite(pw));

        return suite;

    }

    static ReviewDao rd;

}
