import { Schema, model } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'

export interface TPayment {
    date: Date
    amount: number
    method: string
    status: string
    user: Schema.Types.ObjectId
    employee: Schema.Types.ObjectId
}

const PaymentSchema = new Schema<TPayment>(
    {
        date: {
            type: Date,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        method: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'Pendiente', // Estado predeterminado del pago
        },
    },
    handleOptions('payment')
)

// Validación de fecha futura
PaymentSchema.path('date').validate(function (date: Date) {
    return date <= new Date()
}, 'La fecha de pago no puede ser en el futuro')

PaymentSchema.index({ date: 1 })

// Método para buscar pagos en un rango de fechas
PaymentSchema.statics.findPaymentsInRange = function (startDate: Date, endDate: Date) {
    return this.find({ date: { $gte: startDate, $lte: endDate } })
}

// Método de instancia para cambiar el estado del pago
PaymentSchema.methods.markAsPaid = function () {
    this.status = 'Pagado'
    return this.save()
}

export const PaymentModel = model<TPayment>('Payment', PaymentSchema)
