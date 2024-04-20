import { Schema, Types, model } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'
import { IModelDefault } from '@/types/schema'

export type TReport = IModelDefault & {
    date: string | Date
    author: string // Autor del informe
    type: string // Tipo de informe
    content: string // Contenido del informe
    status: string // Estado del informe
    comments: string[] // Comentarios o notas
    attachments: Types.ObjectId[] // Archivos adjuntos
    user: Schema.Types.ObjectId
    employee: Schema.Types.ObjectId
}

const ReportSchema = new Schema<TReport>(
    {
        date: {
            type: Schema.Types.Date,
            required: true,
            unique: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            trim: true,
        },
        comments: {
            type: [String],
            default: [],
        },

        attachments: {
            type: [{ type: Types.ObjectId, ref: 'Attachment' }],
            default: [],
        },
    },
    handleOptions('report')
)

export const ReportModel = model<TReport>('Report', ReportSchema)
