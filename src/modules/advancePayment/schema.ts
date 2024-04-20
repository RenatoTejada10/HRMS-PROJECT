import { Schema, model, Document } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'
import { EmployeeModel } from '../employee/schema'

interface TAdvancePayment extends Document {
    day: number
    month: number
    year: number
    percentage: number // Porcentaje del sueldo neto
    amount: number // Monto del pago por adelantado
    employee: Schema.Types.ObjectId
    notes?: string // Campo opcional para notas adicionales
    user: Schema.Types.ObjectId
}

const AdvancePaymentSchema = new Schema<TAdvancePayment>(
    {
        day: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        percentage: {
            type: Number,
            required: true,
            min: 0,
            max: 100, // Asegura que el porcentaje esté entre 0 y 100
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        employee: {
            type: Schema.Types.ObjectId,
            ref: 'Employee', // Referencia al modelo de empleado
            required: true,
        },

        notes: {
            type: String,
        },
    },
    {
        timestamps: true, // Agrega campos de fecha de creación y actualización automáticamente
    }
)

// Antes de guardar, calcular el monto del pago por adelantado basado en el porcentaje del sueldo neto
AdvancePaymentSchema.pre<TAdvancePayment>('save', async function (next) {
    try {
        const employee = await EmployeeModel.findById(this.employee)
        if (employee) {
            this.amount = (employee.netSalary * 10) / 100 // Calcular el monto del pago por adelantado
        }
        next()
    } catch (error) {}
})

export const AdvancePaymentModel = model<TAdvancePayment>('AdvancePayment', AdvancePaymentSchema)
