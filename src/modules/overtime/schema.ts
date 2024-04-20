import { Schema, model } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'

export type TOvertime = {
    date: Date
    hourWorked: number
    employee: Schema.Types.ObjectId
    user: Schema.Types.ObjectId
}

const OvertimeSchema = new Schema(
    {
        date: {
            type: Date,
            required: true,
            unique: true,
            trim: true,
        },
        hourWorked: {
            type: Number,
            required: true,
            unique: true,
            trim: true,
        },
        employee: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
            required: true,
        },
    },
    handleOptions('overtime')
)

export const OvertimeModel = model<TOvertime>('Overtime', OvertimeSchema)
