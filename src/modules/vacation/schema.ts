import { Schema, model } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'

export interface TVacation {
    employee: Schema.Types.ObjectId // Referencia al empleado que solicita las vacaciones
    startDate: Date // Fecha de inicio de las vacaciones
    endDate: Date // Fecha de fin de las vacaciones
    approved: boolean // Indica si las vacaciones han sido aprobadas
    approver: Schema.Types.ObjectId // Referencia al empleado que aprobó las vacaciones
    reason: string // Motivo de las vacaciones
    user: Schema.Types.ObjectId
}

const VacationSchema = new Schema(
    {
        employee: {
            type: Schema.Types.ObjectId,
            ref: 'Employee', // Referencia al modelo de empleado
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        approved: {
            type: Boolean,
            default: false,
        },
        approver: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
        },
        reason: {
            type: String,
            required: true,
        },
    },
    handleOptions('vacation')
)

export const VacationModel = model<TVacation>('Vacation', VacationSchema)
