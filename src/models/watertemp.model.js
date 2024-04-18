/**
 * Mongoose model watertemp.
 *
 * @author Björn Nyman
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema(
  {
    badplats: {
      type: String,
      required: true,
      enum: [
        'Bettnessand Havsbad',
        'Stöcksjöbadet',
        'Länkebo Havsbad',
        'Ljumviken Havsbad',
        'Kärleksviken',
        'Bölesholmarna',
        'Nydalabadet'
      ]
    },
    geopoint: {
      lon: { type: Number, required: true },
      lat: { type: Number, required: true }
    },
    mattidpunkt: { type: Date, required: true },
    vattentemperatur: { type: Number, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  },
  { collection: 'watertemps' }
)

// Create a model using the schema.
export const Watertemp = mongoose.model('Watertemp', schema)
