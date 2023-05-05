const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");


register = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email ||
            !password)
            return res.status(400).json({ msg: "some parameters are missing" });

        const emailExists = await Admin.findOne({ email });
        

        if (emailExists)
            return res.status(400).json({ msg: "this email already exists" });

        if (password.length < 6)
            return res.status(400).json({ msg: "this password is too short" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({

            email,

            password: hashedPassword,
        });


        await newAdmin.save();

        const accessToken = createaccessToken({
            id: newAdmin._id,
            role: newAdmin.role,
        });
        const refreshToken = createrefreshToken({
            id: newAdmin._id,
            role: newAdmin.role,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "/",
            maxAge: 29 * 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken  ,id: newAdmin._id});
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
},
    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(email)
            if (!email || !password)
                return res.status(400).json({ msg: "some parameters are missing , email or password" });
            const admin = await Admin.findOne({ email });
            if (!admin) return res.status(400).json({ msg: "this email dosen't exist! " });

            const isMatch = await bcrypt.compare(password, admin.password);

            if (!isMatch)
                return res.status(400).json({ msg: "this is a wrong password" });

            const accessToken = createaccessToken({
                id: admin._id,
                role: admin.isAdmin
            });
            const refreshtoken = createrefreshToken({
                id: admin._id,
                role:  admin.isAdmin
            });

            res.cookie("refreshToken", refreshtoken, {
                httpOnly: true,
                path: "/",
                maxAge: 29 * 24 * 60 * 60 * 1000,
            });

            res.json({ accessToken  ,id: admin._id });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    refreshToken = (req, res) => {
        try {
            const rf_token = req.cookies.refreshToken;
            if (!rf_token)
                return res.status(400).json({ msg: "please login or register1" });

         else{
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, Admin) => {
                if (err) {
                    return res.status(400).json({ msg: "Please Login or Register2" });
                }
                const accessToken = createaccessToken({ id: Admin.id, role:  Admin.role });
                res.json({ accessToken });
            });
         }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    logout = async (req, res) => {
        try {
            res.clearCookie("refreshToken", { path: "/" });
            return res.json({ msg: "logged out" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }


const createaccessToken = (Admin) => {
    return jwt.sign(Admin, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};

const createrefreshToken = (Admin) => {
    return jwt.sign(Admin, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
};

module.exports = { login, logout, register, refreshToken };
