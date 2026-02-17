import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema= new Schema({
  title: {
    type: String,
    required: true,
  },
  kartonType: {
    type: String,
    required:true,
  },
  productquantity: {
    type: Number,
    required: true,
  },
   boxquantity: {
    type: Number,
    required: true,
  },
  createdAt: {
  type: Date,
  default: Date.now
  },
  responsible: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    default: null,
  },
  completed:{
    type : Boolean,
    default : false,
  }
});

const Task = mongoose.model('task', TaskSchema);

export default Task;
