function validateBlog(req, res, next) {
    const { title, excerpt, body } = req.body;
    if(!title) return res.status(400).json({message: "title is required"})
    if(!excerpt) return res.status(400).json({message: "excerpt is required"})
    if(!body) return res.status(400).json({message: "body is required"})
    next();
    }
    export default validateBlog;