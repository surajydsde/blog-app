const Post = require("../models/postModel");

const getPosts = async (req, res)=>{
    const posts = await Post.find().populate("author", "name")
    res.json(posts);
}

const getPostById = async(req, res)=>{
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(400).json({message: "Post not Found"});
    res.json(post);
}

const createPost = async(req, res)=>{
    const { title, content } = req.body;
    const post = new Post({title, content, author: req.user._id})
    const created = await post.save();
    res.json(201).json(created);
}

const updatePost = async(req, res)=>{
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(400).json({message: 'Post not found' });
    if(post.author.toString() !== req.user._id.toString()) 
    return res.status(401).json({message: "Unathorized"});

    post.title = req.body.title || post.title
    post.content = req.body.content || post.content
    const updated = await post.save();
    res.json(updated);
}

const deletePost = async(req, res)=>{
    console.log(req.params.id)
    const post = await Post.findById(req.params.id)
    if(!post) return res.status(404).json({message: "Post not Found"})
    if(post.author.toString() !== req.user._id.toString()) 
        return res.status(401).json({message: "Unauthorized"})

    await post.deleteOne();
    res.json({ message: "Post Deleted" })
}

module.exports = {
    getPosts, getPostById, createPost, updatePost, deletePost
}