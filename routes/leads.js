const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");

//import lead
var Leads = require("../models/leads");
// User Model
let User = require("../models/user");

//leads route to display all the leads on table

router.get("/all", ensureAuthenticated, function(req, res) {
  //var query = { name: "deepak sajwan" };
  Leads.find({}, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//route for home to submit data and send mail
router.post("/add", function(req, res) {
  req.checkBody("name", "title is Require").notEmpty();
  req.checkBody("email", "author is Require").notEmpty();
  req.checkBody("company", "body is Require").notEmpty();
  req.checkBody("address", "title is Require").notEmpty();
  //req.checkBody('city' ,'title is Require').notEmpty();
  req.checkBody("region", "author is Require").notEmpty();
  req.checkBody("phone", "body is Require").notEmpty();
  req.checkBody("product", "author is Require").notEmpty();
  req.checkBody("message", "body is Require").notEmpty();
  //errors
  let errors = req.validationErrors();

  if (errors) {
    res.render("contact", {
      title: "Add Lead",
      errors: errors
    });
  } else {
    var lead = new Leads({});
    lead.name = req.body.name;
    lead.email = req.body.email;
    lead.company = req.body.company;
    lead.address = req.body.address;
    lead.region = req.body.region;
    lead.phone = req.body.phone;
    lead.product = req.body.product;
    lead.productRange = req.body.productRange;
    lead.message = req.body.message;
    lead.source = req.body.source;
    lead.status = "Not Assign";
    lead.date = new Date();
    lead.comments = "Not comments provided yet";
    lead.save(function(err) {
      if (err) {
        console.log(err);
        res.json({ status: 500, error: err });
        console.log(lead);
        return;
      } else {
        //res.render("thanku");
res.json({"message":"ok"})
      }
    });
  } //this

  //output for mail content
  var output = `
<p>we have new Enquiry</p>
<h3>Contact Details</h3>
<ul>
  <li>Name:${req.body.name}</li>
  <li>Email:${req.body.email}</li>
  <li>Phone:${req.body.phone}</li>
  <li>Address:${req.body.address}</li>
  <li>Company:${req.body.company}</li>
  <li>Region:${req.body.region}</li>
  <li>Product Type:${req.body.product}</li>
  <li>Product Range:${req.body.productRange}</li>  
  <li>Source:${req.body.source}</li>  
</ul>
<h3>Message</h3>
<p>${req.body.message}</p>  
`;

  //nodemailer script

  let transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-1.amazonaws.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "AKIA2EH6HWSF26LUG4EY", // generated ethereal user
      pass: "BObBP/OymxMOCODitR60q9BpCr1SVfXH9LxrNeW4bO7m" // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols satyam.rawat@econz.net

  let mailOptions = {
    from: '" LMS FG Wilson "<cloud@econz.net>', // sender address
    to: "marketing@jmglimited.com,lakshmi.s@econz.net",
    // to: "satyam.rawat@econz.net,deepak.s@econz.net",
    subject: "LMS FG Wilson JMG ✔", // Subject line
    text: "Hello world", // plain text body
    html: output // html body
  };

  // send mail with defined transport object

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("data submited mail send");
  });
  //end of node mailer
});

//route to single lead
router.get("/data/:id", ensureAuthenticated, function(req, res) {
  Leads.findById(req.params.id, function(err, leads) {
    res.render("leaddata", {
      lead: leads
    });
  });
});

//route load form to  edit lead
router.get("/edit/:id", ensureAuthenticated, function(req, res) {
  Leads.findById(req.params.id, function(err, lead) {
    if (err) {
      console.log(err);
    } else {
      res.render("editform", {
        lead: lead
      });
    }
  });
});

//route save edited form data
router.post("/edit/:id", ensureAuthenticated, function(req, res) {
  console.log("data changed");
  var lead = {};
  lead.name = req.body.name;
  lead.email = req.body.email;
  lead.company = req.body.company;
  lead.phone = req.body.phone;
  lead.product = req.body.product;
  lead.productRange = req.body.productRange;
  // lead.status = req.body.status;

  var query = { _id: req.params.id };
  //console.log(query);
  Leads.update(query, lead, function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash("success", "LEAD Updated");
      res.redirect("/leads/all");
    }
  });
});

//delete updated
router.get("/delete/:id", ensureAuthenticated, function(req, res) {
  var query = { _id: req.params.id };
  Leads.remove(query, function(err) {
    if (err) {
      console.log(err);
    }
    req.flash("success", "LEAD Deleted");
    res.redirect("/leads/all");
  });
});

//filter route for using region
//filter to get region indonesia
router.get("/region/Other", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ region: "Other" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//filter route for using region
//filter to get region viethnam
router.get("/region/Southafrica", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ region: "South Africa" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//filter route for using region
//filter to get region myanmar
router.get("/region/Nigeria", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ region: "Nigeria" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//filter route for using region
//filter to get region Sri Lanka
router.get("/region/Kenya", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ region: "Kenya" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//filter route for using region
//filter to get region bangaladesh
router.get("/region/Ghana", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ region: "Ghana" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//new filters form here

//filter route for using region
//filter to get region Malaysia
router.get("/region/Tanzania", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ region: "Tanzania" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//filter route for using region
//filter to get region Malaysia
router.get("/region/Senegal", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ region: "Senegal" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//filter route for using region
//filter to get region Malaysia
router.get("/region/Zimbabwe", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ region: "Zimbabwe" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//filter route for using region
//filter to get region Malaysia
router.get("/region/Rwanda", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ region: "Rwanda" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//filter route for using region
//filter to get region Malaysia
router.get("/region/Angola", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ region: "Angola" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});
//filter route for using region
//filter to get region Malaysia
router.get("/region/Namibia", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ region: "Namibia" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//filter route for using region
//filter to get region Malaysia
router.get("/region/Zambia", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ region: "Zambia" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//filter route for using region
//filter to get region Malaysia
router.get("/region/Egypt", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ region: "Egypt" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//filter route for using region
//filter to get region Malaysia
router.get("/region/Centralafricanrepublic", ensureAuthenticated, function(
  req,
  res
) {
  // var query = {region:req.params.id};
  Leads.find({ region: "Central African Republic" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});
router.get("/region/Congo", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ region: "Congo" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//filter route for using Status
//filter to get status compleate
router.get("/status/quotationgiven", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ status: "Quotation Given" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//filter route for using Status
//filter to get status Not Assign
router.get("/status/notassign", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ status: "Not Assign" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//filter route for using Status
//filter to get status Assign
router.get("/status/assigned", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ status: "Assigned" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

//new status
//filter route for using Status
//filter to get status Assign
router.get("/status/completedwon", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ status: "Completed Won" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

router.get("/status/notconverted", ensureAuthenticated, function(req, res) {
  // var query = {region:req.params.id};
  Leads.find({ status: "Not Converted" }, function(err, leads) {
    if (err) {
      console.log(err);
    } else {
      // console.log(leads)
      res.render("leads", {
        title: "Welcome To Lead Management System",
        leads: leads
      });
    }
  });
});

// router.get("/region/:regionname", (req, res) => {
//   let region = req.params.regionname;
//   console.log("region", region);
//   res.send(region);
// });

//testing update route
router.post("/sendMail/:id", ensureAuthenticated, function(req, res) {
  console.log("email assign route running");
  //res.send("edit done")
  var lead = {};
  lead.status = "Lead is assigned to: " + req.body.assigneEmail;

  var query = { _id: req.params.id };
  //console.log(query);
  Leads.update(query, lead, function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      Leads.findById(query, function(err, lead) {
        if (err) {
          console.log(err);
        } else {
          var emailReciver = req.body.assigneEmail;
          var output = `
              <p>Please take care of new Enquiry</p>
              <h3>Contact Details</h3>
              <ul>
                <li>Name:${lead.name}</li>
                <li>email:${lead.email}</li>
                <li>Name:${lead.phone}</li>
                <li>Name:${lead.address}</li>
                <li>Name:${lead.company}</li>
                <li>Name:${lead.product}</li>
                <li>Name:${lead.productRange}</li>
              </ul>
              <h3>Message</h3>
              <p>${lead.message}</p>
              `;
          // console.log(output);
          let transporter = nodemailer.createTransport({
            host: "email-smtp.us-east-1.amazonaws.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "AKIAJDMA7JI7VCFTVTIA", // generated ethereal user
              pass:
                "KIAJT6X35LB6PYWVKIA,BAXIQkgeYj3R3NgR8g97dl/FsKpvGNkVbfOuvonk6Wig" //"AlzzZHq0CyHhaZ0tbq9MhHuNdVP34YD1RBT7iQyoQpUW"  generated ethereal password
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          // setup email data with unicode symbols
          let mailOptions = {
            from: '" LMS FG Wilson " <deepak.s@econz.net>', // sender address
            to: emailReciver, //
            subject: "LMS FG Wilson Asia Lead", // Subject line
            text: "Hello world", // plain text body
            html: output // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log("data submited mail send");
          });
          // res.render('editform', {
          //   lead: lead
          // })
        } //end of send mail to assine
      });
      req.flash("success", "LEAD Updated");
      res.redirect("/leads/all");
    }
  });
});

//comments routes
router.post("/comments/:id", ensureAuthenticated, function(req, res) {
  //console.log('cooments route is working')
  //res.send("edit done")
  var lead = {};
  lead.comments = req.body.comment;
  var query = { _id: req.params.id };
  //console.log(query);
  Leads.update(query, lead, function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash("success", "LEAD Updated");
      res.redirect("/leads/all");
    }
  });
});

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("danger", "Please login");
    res.redirect("/users/login");
  }
}

module.exports = router;
