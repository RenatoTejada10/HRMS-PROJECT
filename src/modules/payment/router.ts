import { handleError } from '@/helpers/router.helper'
import { Router } from 'express'
import { PaymentModel } from './schema'

const pathName = 'payment'

const router = Router()

router.get(`/${pathName}`, async (req, res) => {
    try {
        const matches = await PaymentModel.find({}, null, {
            populate: [
                { path: 'user', model: 'User', options: { strictPopulate: false } },
                { path: 'employee', model: 'Employee', options: { strictPopulate: false } },
            ],
        })
        return res.status(200).json(matches)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.get(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        const match = await PaymentModel.findById(id, null, {
            populate: [
                { path: 'user', model: 'User', options: { strictPopulate: false } },
                { path: 'employee', model: 'Employee', options: { strictPopulate: false } },
            ],
        })

        if (!match) return res.status(404).json({ error: 'Payment not found' })
        return res.status(200).json(match)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.post(`/${pathName}`, async (req, res) => {
    const input = req.body

    try {
        await PaymentModel.create(input)
        return res.status(201).json({ message: 'Payment created' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.put(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id
    const input = req.body

    try {
        await PaymentModel.findByIdAndUpdate(id, input)
        return res.status(200).json({ message: 'Payment updated' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

export const PaymentRouter = router
