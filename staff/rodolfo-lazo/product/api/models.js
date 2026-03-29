import mongoose from 'mongoose'

const { Schema, ObjectId, model } = mongoose

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const URL_REGEX = /(www|http:|https:)+[^\s]+[\w]/

const userSchema = new Schema({
    name: {
        type: String,
        minLength: 1,
        required: true
    },

    email: {
        type: String,
        minLength: 6,
        match: EMAIL_REGEX,
        required: true,
        unique: true
    },

    username: {
        type: String,
        minLength: 3,
        required: true,
        unique: true
    },

    password: {
        type: String,
        minLength: 8,
        required: true
    },

    image: {
        type: String,
        match: URL_REGEX,
        default: null
    },

    role: {
        type: String,
        enum: ['regular', 'administrator'],
        default: 'regular',
        required: true
    }
})

const petSchema = new Schema({
    owner: {
        type: ObjectId
    },

    name: {
        type: String,
        minLength: 1,
        required: true
    },

    birthdate: {
        type: Date,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        match: URL_REGEX,
        required: true
    }
})

export const UserModel = model('User', userSchema)
export const PetModel = model('Pet', petSchema)
export const database = mongoose