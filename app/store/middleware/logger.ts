import {formatLog, logDebug, logInfo} from '@app/utils';

export const createLogger = () => {
    return ({getState}: any) =>
        (next: (arg0: any) => void) =>
        (action: any) => {
            logInfo('REDUX DISPATCHING');

            // Log the current action
            logDebug(`● [ACTION]: \n${formatLog(action)}`);

            /*
              Call when middleware has done its job 
              To send the action to a reducer or the next middleware
            */
            next(action);

            // Log the new state after the action is executed
            logDebug(`● [NEXT_STATE]: \n${formatLog(getState())}`);
        };
};
