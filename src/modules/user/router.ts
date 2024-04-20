import { handleError } from '@/helpers/router.helper'
import { Router } from 'express'
import { UserModel } from './schema'

const pathName = 'users'

const router = Router()

router.get(`/${pathName}`, async (req, res) => {
    try {
        const matches = await UserModel.find()
        return res.status(200).json(matches)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.get(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        const match = await UserModel.findById(id)

        if (!match) return res.status(404).json({ error: 'User not found' })
        return res.status(200).json(match)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.post(`/${pathName}`, async (req, res) => {
    const { password, ...input } = req.body

    try {
        await UserModel.create({ ...input, password })
        return res.status(201).json({ message: 'User created' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.put(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id
    const input = req.body

    try {
        await UserModel.findByIdAndUpdate(id, input)
        return res.status(200).json({ message: 'User updated' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.delete(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        await UserModel.findByIdAndDelete(id)
        return res.status(200).json({ message: 'User deleted' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

export const UserRouter = router
