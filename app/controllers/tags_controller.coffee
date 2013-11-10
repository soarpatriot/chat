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

# to edit page
exports.edit = (req,res) ->

  id = req.params.id
  console.log('id'+id)
  Tag.findOne {'_id':id}, (err,tag) ->
    if(err)
      req.flash('error', err)
      return res.redirect('/tags')

    res.render('tags/edit', {
      title: '修改',
      user : req.user,
      currentLink: 'MICRO',
      tag: tag,
      success : req.flash('success').toString(),
      error : req.flash('error').toString()
    });

# confirm edit page
exports.doEdit = (req,res) ->
  tagData = req.body.tag
  id = tagData._id
  delete tagData._id

  console.log tagData
  Tag.update { _id: id }, tagData, { multi: true }, (err, numberAffected, raw) ->
    if(err)
      console.log err
      req.flash('error').toString()
      res.redirect('/tags/'+tagData._id+'/edit')
    else
      console.log 'success'
      console.log numberAffected + raw
      req.flash('success','tag 修改成功！')
      res.redirect('/tags')


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

# delete tag
exports.destroy = (req,res) ->
  Tag.remove { _id: req.body.tagId}, (err) ->
    if err
      req.flash('error', '删除失败！')
      res.redirect('/tags/');
    else
      req.flash('success', '删除成功！');
      res.redirect('/tags/');
