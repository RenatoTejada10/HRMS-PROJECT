import { handleError } from '@/helpers/router.helper'
import { Router } from 'express'
import { VacationModel } from './schema'

const pathName = 'vacation'

const router = Router()

router.get(`/${pathName}`, async (req, res) => {
    try {
        const matches = await VacationModel.find({}, null, {
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
        const match = await VacationModel.findById(id, null, {
            populate: [
                { path: 'user', model: 'User', options: { strictPopulate: false } },
                { path: 'employee', model: 'Employee', options: { strictPopulate: false } },
            ],
        })

        if (!match) return res.status(404).json({ error: 'Vacation not found' })
        return res.status(200).json(match)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.post(`/${pathName}`, async (req, res) => {
    const input = req.body

    try {
        await VacationModel.create(input)
        return res.status(201).json({ message: 'Vacation created' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.put(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id
    const input = req.body

    try {
        await VacationModel.findByIdAndUpdate(id, input)
        return res.status(200).json({ message: 'Vacation updated' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

export const VacationRouter = router
