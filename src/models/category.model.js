const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const categorySchema = mongoose.Schema(
  {
    modelName: String,
    modelThumbnail: String,
    modelCategory: String,
    modelScaleX: Number,
    modelScaleY: Number,
    modelScaleZ: Number,
    rotationX: Number,
    rotationY: Number,
    rotationZ: Number,
    positionX: Number,
    positionY: Number,
    positionZ: Number,
    minY: Number,
    maxY: Number,
    restrictVertical: Boolean,
    rotationAxis: {
      type: String,
      enum: ['x', 'y', 'z'],
    },
    thumbnailUrl: String,
    modelUrl: String,
    size: String, // Assuming size is a string, you can change the type accordingly
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(toJSON);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
