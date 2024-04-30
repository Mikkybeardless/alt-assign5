import  {createLogger, transports, format} from "winston"
import dotenv from "dotenv"

dotenv.config();
const logger = createLogger({
    transports:[
        new transports.Console({
            level:"info",
            format: format.combine(format.timestamp(), format.json())
}),
new transports.Console({
    level:"error",
    format: format.combine(format.timestamp(), format.json())
})
    ]
})

export default logger;