import { handleError } from '@/helpers/router.helper'
import { Router } from 'express'
import { EmployeeModel } from './schema'

const pathName = 'employee'

const router = Router()

router.get(`/${pathName}`, async (req, res) => {
    try {
        const matches = await EmployeeModel.find({}, null, {
            populate: [{ path: 'user', model: 'User', options: { strictPopulate: false } }],
        })
        return res.status(200).json(matches)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.get(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        const match = await EmployeeModel.findById(id, null, {
            populate: [{ path: 'user', model: 'User', options: { strictPopulate: false } }],
        })

        if (!match) return res.status(404).json({ error: 'Employee not found' })
        return res.status(200).json(match)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.post(`/${pathName}`, async (req, res) => {
    const input = req.body

    try {
        await EmployeeModel.create(input)
        return res.status(201).json({ message: 'Employee created' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.put(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id
    const input = req.body

    try {
        await EmployeeModel.findByIdAndUpdate(id, input)
        return res.status(200).json({ message: 'Employee updated' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.delete(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        await EmployeeModel.findByIdAndDelete(id)
        return res.status(200).json({ message: 'Employee deleted' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

export const EmployeeRouter = router
