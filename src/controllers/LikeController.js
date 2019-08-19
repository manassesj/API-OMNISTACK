const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {

        const { user } = req.headers;
        const { devid } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devid);

        if(!targetDev) {
            return res.status(400).json({ error: 'Dev not exists.' });
        }

        if (targetDev.like.includes(loggedDev._id)){
            console.log('DEU MATCH')
        }

        loggedDev.like.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};