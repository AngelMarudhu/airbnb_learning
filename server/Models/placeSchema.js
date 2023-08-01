import mongoose from 'mongoose';

const placesSchema = new mongoose.Schema({
  // Suppose you have two Mongoose models: user and places. The User model represents a user of your application, places represents a places of your application
  // In this example, the owner field is defined as an ObjectId that references the User model. This allows us to create a relationship between the places model and the User model, so we can easily retrieve information about the user who own the house each posts.
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  title: { type: String },
  address: { type: String },
  photos: {
    type: [String],
    default: [],
  },
  description: { type: String },
  perks: {
    type: [String],
    default: [],
  },
  extraInfo: { type: String },
  checkIn: { type: Number },
  checkOut: { type: Number },
  maxGuests: { type: Number },
  price: { type: String },
});

export default mongoose.model('places', placesSchema);
