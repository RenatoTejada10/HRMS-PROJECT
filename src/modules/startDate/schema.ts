import { Schema, model } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'

export type TStartDate = {
    startDate: Date
    isActive: boolean
    user: Schema.Types.ObjectId
}

const StartDateSchema = new Schema(
    {
        startDate: {
            type: Date,
            required: true,
        },
        isActive: {
            type: Boolean,
            required: true,
        },
    },
    handleOptions('startDate')
)

export const StartDateModel = model<TStartDate>('StartDate', StartDateSchema)
