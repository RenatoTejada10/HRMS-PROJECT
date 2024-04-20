import { handleError } from '@/helpers/router.helper'
import { Router } from 'express'
import { StartDateModel } from './schema'

const pathName = 'users'

const router = Router()

router.get(`/${pathName}`, async (req, res) => {
    try {
        const matches = await StartDateModel.find()
        return res.status(200).json(matches)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.get(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        const match = await StartDateModel.findById(id)

        if (!match) return res.status(404).json({ error: 'StartDate not found' })
        return res.status(200).json(match)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.post(`/${pathName}`, async (req, res) => {
    const { password, ...input } = req.body

    try {
        await StartDateModel.create({ ...input, password })
        return res.status(201).json({ message: 'StartDate created' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.put(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id
    const input = req.body

    try {
        await StartDateModel.findByIdAndUpdate(id, input)
        return res.status(200).json({ message: 'StartDate updated' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.delete(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        await StartDateModel.findByIdAndDelete(id)
        return res.status(200).json({ message: 'StartDate deleted' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

export const StartDateRouter = router
