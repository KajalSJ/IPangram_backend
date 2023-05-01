import applicationStack from "./app.js";

const {
    attachCoreMiddlewares,
    attachExternalMiddlewares,
    attachRouters,
    connectToDatabase,
  } = applicationStack,
  bootstrap = async () => {
    await attachCoreMiddlewares();
    await attachExternalMiddlewares();
    await attachRouters();
    await connectToDatabase();
  };
bootstrap();
