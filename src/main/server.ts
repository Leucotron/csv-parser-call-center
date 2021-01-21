import app from './config/app'
import env from './config/env'

app.listen(env.port, () => console.log(`App running at http://localhost:${env.port}`))
