import { Schema, model } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'

export type TAssistance = {
    day: Date
    hour: number
    user: Schema.Types.ObjectId
    employee: Schema.Types.ObjectId
}

const AssistanceSchema = new Schema(
    {
        day: {
            type: Date,
            required: true,
            unique: true,
            trim: true,
        },
        hour: {
            type: Number,
            required: true,
            unique: true,
            trim: true,
        },
    },
    handleOptions('assistance')
)

export const AssistanceModel = model<TAssistance>('Assistance', AssistanceSchema)
