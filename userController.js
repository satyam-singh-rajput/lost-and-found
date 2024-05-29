import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model.js'
import generateToken from '../utils/generateToken.js';

//desc-   auth user/set token 
//route-  post/api/users/auth
//access- public

const authUser=  asyncHandler ( async (req,res)=>{
    const { RegistrationNo, Password } = req.body;

    if (!RegistrationNo || !Password) {
        return res.status(400).send("All Fields are Necessary");
    }

    const user = await User.findOne({ RegistrationNo });
    if(user && (await user.matchPassword(Password)) ){
        generateToken(res,user._id);
        res.status(200).json({
            _id:user._id,
            RegistrationNo:user.RegistrationNo,
            Password:user.Password,
        });
    }
    else{
        res.status(401);
        throw new Error('Invalid RegistrationNo or Password');
    }
} );

//desc-   Get user by registration number
//route-  GET /api/users/:registrationNo
//access- Private

const getUserByRegistrationNo = asyncHandler(async (req, res) => {
    console.log(req);
    const user = await User.findOne({ RegistrationNo: req.params.RegistrationNo });
    console.log(user);
    if (user) {
        res.status(200).json({ message: 'User found', user });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


//desc-   register a new user 
//route-  post/api/users
//access- public

const registerUser=  asyncHandler ( async (req,res)=>{
    const { RegistrationNo, Password , Branch, Year, Hostel} = req.body;

    if (!RegistrationNo || !Password|| !Branch|| !Year|| !Hostel) {
        return res.status(400).send("All Fields are Necessary");
    }

    const existingUser = await User.findOne({ RegistrationNo });
    // console.log(existingUser);
    if (existingUser) {
       res.status(400);
       console.log(existingUser);
       throw new Error('Registration number already exists');
    }
    const newUser = await User.create({ RegistrationNo, Password: Password, Branch:Branch, Year:Year, Hostel:Hostel});
    if(newUser)
    {
        generateToken(res,newUser._id)
        res.status(200).json({
            _id : newUser._id,
            RegistrationNo:newUser.RegistrationNo, 
            Password: newUser.Password,
        });
    }
    else
    {
        res.status(400);
        throw new Error ('Invalid user Data');
    }
    res.status(200).json({message:'resister user'});   
} );

//desc-   logout  user 
//route-  post/api/users/logout
//access- private

const logoutUser=  asyncHandler ( async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    });
    res.status(200).json({message:'User logged Out '});   
} );

//desc-   get profile of  user 
//route-  get/api/users/profile
//access- private

const getUserProfile =  asyncHandler ( async (req,res)=>{
    res.status(200).json({message:'Go to profile  of  user'});   
} );

//desc-   put/update profile of  user 
//route-  put/api/users/profile
//access- private

const updateUserProfile =  asyncHandler ( async (req,res)=>{
    const user= await User.findById(req.user._id);
    if(user)
    {
        user.RegistrationNo=req.body.RegistrationNo;
        user.Branch=req.body.Branch,
        user.Year=req.body.Year,
        user.Hostel=req.body.Hostel
        if(req.body.Password)
        {
            user.Password=req.body.Password
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id:updatedUser._id,
            RegistrationNo:updatedUser.RegistrationNo,
            Hostel:updatedUser.Hostel,
        })
    }
    else{
        throw new Error('User Not Found')
    } 
} );

export { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUserByRegistrationNo
 };