const mongoose = require('mongoose');

const VideoModel = mongoose.model('VideoModel');

module.exports = {
  async index(req, res) {
    const videoinfo = await VideoModel.find();
    return res.json(videoinfo);
  },

  async storage(req, res) {
    const videoinfo = await VideoModel.create(req.body);
    return res.json(videoinfo);
  },

  async show(req, res) {
    const videoinfo = await VideoModel.findById(req.params.id);
    return res.json(videoinfo);
  },

  async update(req, res) {
    const videoinfo = await VideoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(videoinfo);
  },

  async delete(req, res) {
    const videoinfo = await VideoModel.findByIdAndDelete(req.params.id);
    return res.json(videoinfo);
  },

};
