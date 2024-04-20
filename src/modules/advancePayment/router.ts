import { handleError } from '@/helpers/router.helper'
import { Router } from 'express'
import { AdvancePaymentModel } from './schema'

const pathName = 'advancePayment'

const router = Router()

router.get(`/${pathName}`, async (req, res) => {
    try {
        const matches = await AdvancePaymentModel.find({}, null, {
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
        const match = await AdvancePaymentModel.findById(id, null, {
            populate: [
                { path: 'user', model: 'User', options: { strictPopulate: false } },
                { path: 'employee', model: 'Employee', options: { strictPopulate: false } },
            ],
        })

        if (!match) return res.status(404).json({ error: 'AdvancePayment not found' })
        return res.status(200).json(match)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.post(`/${pathName}`, async (req, res) => {
    const input = req.body

    try {
        await AdvancePaymentModel.create(input)
        return res.status(201).json({ message: 'AdvancePayment created' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.put(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id
    const input = req.body

    try {
        await AdvancePaymentModel.findByIdAndUpdate(id, input)
        return res.status(200).json({ message: 'AdvancePayment updated' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.delete(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        await AdvancePaymentModel.findByIdAndDelete(id)
        return res.status(200).json({ message: 'AdvancePayment deleted' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

export const AdvancePaymentRouter = router
