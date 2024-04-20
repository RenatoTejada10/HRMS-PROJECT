import type { Response } from 'express'

export const handleError = (error: any, res: Response, pathName: string) => {
    console.error(error.message)
    return res.status(400).json({ error: `error in ${pathName}` })
}
