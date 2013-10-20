## tags controller

Tag = require('../models/tag.js')

# display all the tags information at table
exports.index = (req,res) ->
  Tag.find {}, (err,tags) ->

    if(err)
      req.flash('error', err)
      return res.redirect('/')

    res.render('tags/index', {
      title: '标签',
      user : req.user,
      tags : tags,
      success : req.flash('success').toString(),
      error : req.flash('error').toString()
    });

# redirect to add page
exports.new = (req,res) ->
  tag =
    key:''
    name:''
    content:''
  res.render('tags/new', {
    title: '添加',
    user : req.user,
    currentLink: 'MICRO',
    tag: tag,
    success : req.flash('success').toString(),
    error : req.flash('error').toString()
  });

# add a tag to db
exports.create = (req,res) ->
  tagData = req.body.tag
  tag = new Tag(tagData)
  console.log tag
  tag.save (err)->
    if(err)
      res.render('tags/new', {
        title: '添加',
        tag : tag,
        currentLink: 'MICRO',
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
      });
    else
      req.flash('success','tag 添加成功！')
      res.redirect('/tags')

