const bcrypt = require('bcryptjs');
const Security = require('../../models/security');

const addSecurityMember = async (req, res) => {
    const {
        name,
        email,
        password,
        phoneNumber,
        imgUrl,
        age,
        gender,
        salary,
        job
    } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Some required fields are missing' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newSecurityMember = await new Security({
            name,
            email,
            password: hashedPassword,
            imgUrl,
            age,
            gender,
            salary,
            phoneNumber,
            job
        }).save();

        return res.status(201).json(newSecurityMember);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Failed to create a new security member' });
    }
};

const updateSecurityMember = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        email,
        password,
        phoneNumber,
        imgUrl,
        age,
        gender, salary,
        job
    } = req.body;

    try {
        const securityMember = await Security.findById(id);

        if (!securityMember) {
            return res.status(404).json({ msg: 'Security member not found' });
        }



        const updatedSecurityMember = await Security.updateOne({ _id: id }, {
            $set: {
                name,
                email,
                password,
                phoneNumber,
                imgUrl,
                age,
                gender,
                salary,
                job
            }
        }, { new: true }).select('-updatedAt -__v')

        return res.json(updatedSecurityMember);
    } catch (error) {

        return res.status(500).json({ msg: 'Failed to update the security member', e: error.message });
    }
};

const deleteSecurityMember = async (req, res) => {
    const { id } = req.params;

    try {
        const securityMember = await Security.findById(id);

        if (!securityMember) {
            return res.status(404).json({ msg: 'Security member not found' });
        }

        await Security.deleteOne({ _id: id })

        return res.json({ msg: 'Security member deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Failed to delete the security member', e: error.message });
    }
};

const getSecurityMember = async (req, res) => {
    const { id } = req.params;

    try {
        const securityMember = await Security.findById(id).select('-updatedAt');

        if (!securityMember) {
            return res.status(404).json({ msg: 'Security member not found' });
        }

        return res.json(securityMember);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Failed to get the security member', e: error.message });
    }
};

const getAllMembers = async (req, res) => {
    try {
        const members = await Security.find().select('-updatedAt -__v').sort('name');
        return res.status(200).json(members);
    } catch (error) {
        return res.status(500).json({ msg: 'Failed to retrieve security members' });
    }
};

module.exports = {
    addSecurityMember,
    updateSecurityMember,
    deleteSecurityMember,
    getSecurityMember,
    getAllMembers
};

