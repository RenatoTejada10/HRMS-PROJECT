import { Schema, model, Types } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'
import { IModelDefault } from '@/types/schema'

export interface TUser extends IModelDefault {
    name: string
    document: number
    email: string
    password: string
    role: string
    registrationDate: Date
    phone: number
    address: {
        street: string
        city: string
        state: string
        postalCode: string
    }
    birthdate: Date
    gender: string
    isActive: boolean
}

const UserSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        document: {
            type: Number,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'user'],
            default: 'user',
        },
        registrationDate: {
            type: Schema.Types.Date,
            default: Date.now,
        },
        phone: {
            type: Number,
            trim: true,
        },
        address: {
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            state: { type: String, trim: true },
            postalCode: { type: String, trim: true },
        },
        birthdate: {
            type: Schema.Types.Date,
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    handleOptions('users')
)

export const UserModel = model<TUser>('User', UserSchema)
