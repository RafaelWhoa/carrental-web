const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect("mongodb://carrentalproject:2onbgHEeyEZpVJaJKV8cXgDmnvxQVsa6ETJjFVvpeRCG5NvJRjXrOFfKyRVXthrgtJ6Yzfm1pPhGzwY86JRsMw==@carrentalproject.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@carrentalproject@", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database!")
}).catch((err) => {
    console.log("Error: ", err.message)
})

module.exports = {Mongoose: mongoose}