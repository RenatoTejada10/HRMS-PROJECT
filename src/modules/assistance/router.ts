import { handleError } from '@/helpers/router.helper'
import { Router } from 'express'
import { AssistanceModel } from './schema'

const pathName = 'assistance'

const router = Router()

router.get(`/${pathName}`, async (req, res) => {
    try {
        const matches = await AssistanceModel.find({}, null, {
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
        const match = await AssistanceModel.findById(id, null, {
            populate: [
                { path: 'user', model: 'User', options: { strictPopulate: false } },
                { path: 'employee', model: 'Employee', options: { strictPopulate: false } },
            ],
        })

        if (!match) return res.status(404).json({ error: 'Assistance not found' })
        return res.status(200).json(match)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.post(`/${pathName}`, async (req, res) => {
    const input = req.body

    try {
        await AssistanceModel.create(input)
        return res.status(201).json({ message: 'Assistance created' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.put(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id
    const input = req.body

    try {
        await AssistanceModel.findByIdAndUpdate(id, input)
        return res.status(200).json({ message: 'Assistance updated' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.delete(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        await AssistanceModel.findByIdAndDelete(id)
        return res.status(200).json({ message: 'Assistance deleted' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

export const AssistanceRouter = router
