const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const _handlebars = require('handlebars'); //
const {
    allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access') //

const dashboardRouters = require("./routers/dashboard-routers");
const apiRouter = require("./routers/api-routers");
const app = express();

//middleware excecute for data's form from client to server
app.use(
    express.urlencoded({
        extended: true,
    })
);


const db = require('./database/mongo')
db.connect()



app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

//HTTP logger
// app.use(morgan('combined'));



//template engine
app.engine(
    "handlebars",
    exphbs({
        helpers: {
            sum: (a, b) => a + b,
        },
        handlebars: allowInsecurePrototypeAccess(_handlebars), //
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    }),

);

app.set("view engine", "handlebars");

app.set("views", path.join(__dirname, "resources", "views"));

app.use(dashboardRouters);
app.use(apiRouter);

app.listen(3000);