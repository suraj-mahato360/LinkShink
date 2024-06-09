const URL = require('../Models/url');
const shortid = require('shortid');

async function handleGenerateNewShortURL (req, res) {
        const body = req.body;
        if(!body.url) return res.status(400).json({ error: "url is required" })
        const shortID = shortid.generate();
        await URL.create({
                shortId: shortID,
                redirectURL: body.url,
                visitHistory: [],
                createdBy: req.user._id,
        });
        return res.render("home", { id: shortID,  });
}

async function handleRedirectNewShortURL (req, res) {
        const shortId = req.params.id;
        const entry = await URL.findOneAndUpdate({
                shortId,
        },
        {
                $push: {
                        visitHistory: {
                                timestamp: Date.now(),
                        },
                },
        }
)
        res.redirect(entry.redirectURL)
};

async function handleAnalytics (req, res) {
        const shortId = req.params.id;
        const result = await URL.findOne({shortId});
        return res.json({ clicks: result.visitHistory.length, analytics: result.visitHistory });
}

async function handleDeleteUrl (req, res) {
        const shortId = req.params.id;
        const url = await URL.findOneAndDelete({shortId})
        return res.json({ msg: "Url deleted", url })
}

module.exports = {
        handleGenerateNewShortURL,
        handleRedirectNewShortURL,
        handleAnalytics,
        handleDeleteUrl,
}