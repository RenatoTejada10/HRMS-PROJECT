import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './settings/database.settings'
import { AssistanceRouter } from './modules/assistance/router'
import { UserRouter } from './modules/user/router'
import { OvertimeRouter } from './modules/overtime/router'
import { VacationRouter } from './modules/vacation/router'
import { PaymentRouter } from './modules/payment/router'
import { AdvancePaymentRouter } from './modules/advancePayment/router'
import { WebinarRouter } from './modules/webinar/router'
import { EmployeeRouter } from './modules/employee/router'
import { ReportRouter } from './modules/report/router'
import { StartDateRouter } from './modules/startDate/router'

const app = express()

const initServer = async () => {
    await connectToDatabase()

    app.use(cors({ origin: ['http://localhost:3000'] }))
    app.use(express.json())

    app.use(AssistanceRouter)
    app.use(PaymentRouter)
    app.use(OvertimeRouter)
    app.use(UserRouter)
    app.use(VacationRouter)
    app.use(AdvancePaymentRouter)
    app.use(WebinarRouter)
    app.use(EmployeeRouter)
    app.use(ReportRouter)
    app.use(StartDateRouter)

    app.listen(4000, () => {
        console.log('Server is running on port http://localhost:4000')
    })
}

initServer()
