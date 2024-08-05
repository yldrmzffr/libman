import { Logger } from '@nestjs/common';

export const LogMe = () => {
  return (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor,
  ): void => {
    const original = descriptor.value;
    const logger = new Logger(target.constructor.name);

    descriptor.value = new Proxy(original, {
      async apply(target, thisArg, args) {
        logger.debug(`${methodName} called with args: ${JSON.stringify(args)}`);

        try {
          const result = await target.apply(thisArg, args);
          logger.debug(`${methodName} completed successfully`);
          return result;
        } catch (error) {
          logger.error(
            `${methodName} threw an error: ${error.message}`,
            error.stack,
          );
          throw error;
        }
      },
    });
  };
};
