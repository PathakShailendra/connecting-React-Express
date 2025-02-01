module.exports.index = async (req, res, next) => {
    res.status(200).json({
        message: 'Heliooo World'
    });
}