import { connect } from 'mongoose'

export const connectToDatabase = async () => {
    try {
        await connect('mongodb://127.0.0.1:27017/HRMS')
        console.log('Connected to database')
    } catch (error) {
        console.error('Error connecting to database:', error)
    }
}
