const News = require('../models/News')
const Comment = require('../models/Comment')
const { findOneAndUpdate } = require('../models/Comment')

const controllerNews = {
    addNews: (req, res) => {
        const { title, subtitle, body, images, date } = req.body
        const newsSave = new News({
            title, subtitle, body, images, date
        })

        newsSave.save()
            .then(news => res.json({ succes: true, news }))
            .catch(error => res.json({ succes: false, error }))
    },

    getNews: async (req, res) => {
        const news = await News.find()
        res.json({ succes: true, news })
    },
    
    putCommentary: async (req, res) => {
        
        const { idNews, content } = req.body
        const { username, urlpic } = req.user
        const newCommentary = new Comment({ content, userPic: urlpic, username, idNews })
        const commentary = await newCommentary.save()
      
        res.json({
            succes: true,
            commentary
        })
    },
    getCommentaries: async (req, res) => {
        const commentary = await Comment.find()
        res.json({ succes: true, commentary })
    },
    deleteCommentary: async (req, res) => {
        const { idComment } = req.body
        const commentaryDeleted = await Comment.findByIdAndDelete(
           idComment
        )
        const comments = await Comment.find()
        res.json({
            success: true,
            comments
        })
    },
    modifyCommentary: async (req, res) => {
        
        const { content, idComment } = req.body
        const commentaryDeleted = await Comment.findByIdAndUpdate(
            idComment
        , {
            content
        },
            {
                returnNewDocument: true
            })
        const comments = await Comment.find()
        res.json({
            success: true,
            comments
        })
    }
}

module.exports = controllerNews