import { Schema, model } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'

export type TEmployee = {
    fullname: string
    email: string
    documents: number
    bruteSalary: number
    netSalary: number
    area: string
    department: string
    position: string
    dateOfJoining: Date
    manager: string
    contact: number
    user: Schema.Types.ObjectId
}

const EmployeeSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        documents: {
            type: Number,
            required: true,
        },
        netSalary: {
            type: Number,
            required: true,
        },
        bruteSalary: {
            type: Number,
            required: true,
        },
        area: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        dateOfJoining: {
            type: Date,
            required: true,
        },
        manager: {
            type: String,
            required: true,
        },
        contact: {
            type: Number,
            required: true,
        },
    },

    handleOptions('employee')
)

export const EmployeeModel = model<TEmployee>('Employee', EmployeeSchema)
