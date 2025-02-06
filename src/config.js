const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

const configureSession = (app, prisma) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "supmyerseckeyret",
      resave: false,
      saveUninitialized: false,
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
      }),
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
    })
  );
};

module.exports = { configureSession };
