const express = require('express');
const router = express.Router();

 const {login,signup} = require('../controllers/Auth');
const {auth, isAdmin,isStudent} = require('../middlewares/midauth');


//testing route for single middlewares
router.get('/test', auth, (req, res) => {
    res.json({
         success: true,
         message: "Protected route accessed successfully",
      });
   });

//Protected routes
router.get('/admin', auth, isAdmin, (req, res) => {
      res.json({
         success: true,
         message: "Admin route accessed successfully",
      });
   });

   router.get('/student', auth, isStudent, (req, res) => {
      res.json({
         success: true,
         message: "Student route accessed successfully",
      });
   });

      //open routes
 router.post('/login', login);
    router.post('/signup', signup);


    module.exports = router;