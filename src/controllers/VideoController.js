const mongoose = require('mongoose');
const ffmpeg = require('fluent-ffmpeg');

const VideoModel = mongoose.model('VideoModel');

module.exports = {
  async index(req, res) {
    const videoinfo = await VideoModel.find();
    return res.json(videoinfo);
  },

  async storage(req, res) {
    const { title, description } = await req.body;
    const { destination, filename, path } = await req.file;

    await ffmpeg(path).takeScreenshots({
      count: 1,
      timemarks: ['25%'],
      filename: `${filename}-thumbnail.jpg`,
    }, destination);

    const videoinfo = await VideoModel.create({
      title,
      description,
      url: `/play/${filename}`,
      thumbnail: `/thumb/${filename}-thumbnail.jpg`,
    });

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
