import { handleError } from '@/helpers/router.helper'
import { Router } from 'express'
import { ReportModel } from './schema'

const pathName = 'report'

const router = Router()

router.get(`/${pathName}`, async (req, res) => {
    try {
        const matches = await ReportModel.find({}, null, {
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
        const match = await ReportModel.findById(id, null, {
            populate: [
                { path: 'user', model: 'User', options: { strictPopulate: false } },
                { path: 'employee', model: 'Employee', options: { strictPopulate: false } },
            ],
        })

        if (!match) return res.status(404).json({ error: 'Report not found' })
        return res.status(200).json(match)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.post(`/${pathName}`, async (req, res) => {
    const input = req.body

    try {
        await ReportModel.create(input)
        return res.status(201).json({ message: 'Report created' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.put(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id
    const input = req.body

    try {
        await ReportModel.findByIdAndUpdate(id, input)
        return res.status(200).json({ message: 'Report updated' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.delete(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        await ReportModel.findByIdAndDelete(id)
        return res.status(200).json({ message: 'Report deleted' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

export const ReportRouter = router
