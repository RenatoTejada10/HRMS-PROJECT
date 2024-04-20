import { Schema, model, Types } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'

interface Speaker {
    name: string
    bio: string
}

export interface TWebinar {
    title: string //Titulo del Webinar
    description: string // Descripcion del webinar
    dateTime: Date
    duration: number // Duración en minutos
    accessLink: string // Enlace de acceso al webinar
    speakers: Speaker[] // lista de oradores del webinar, se puede agregar datos especificos de ellos
    status: string // Estado del webinar tal como programado, en curso o finilizado
    attendees: Types.ObjectId[] // Lista de Ids de colaboradores que se han registrado al webinar
    comments: {
        employeeId: Types.ObjectId
        message: string
        timestamp: Date
    }[] // Lista de comentarios dejados por los colaboradores con sus datos exactos
    user: Schema.Types.ObjectId
    employee: Schema.Types.ObjectId
}

const WebinarSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        dateTime: {
            type: Date,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        accessLink: {
            type: String,
            required: true,
        },
        speakers: {
            type: [
                {
                    name: { type: String, required: true },
                    bio: { type: String, required: true },
                },
            ],
            required: true,
        },
        status: {
            type: String,
            enum: ['scheduled', 'ongoing', 'finished'],
            default: 'scheduled',
        },
        attendees: {
            type: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
            default: [],
        },
        comments: {
            type: [
                {
                    userId: { type: Schema.Types.ObjectId, ref: 'Employee' },
                    message: { type: String, required: true },
                    timestamp: { type: Date, default: Date.now },
                },
            ],
            default: [],
        },
    },
    handleOptions('webinar')
)

WebinarSchema.virtual('user', {
    ref: 'User',
    localField: '_id',
    foreignField: 'webinar',
})

WebinarSchema.virtual('employee', {
    ref: 'Employee',
    localField: '_id',
    foreignField: 'webinar',
})
export const WebinarModel = model<TWebinar>('Webinar', WebinarSchema)
