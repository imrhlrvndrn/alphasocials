export const formSubmit = ({ event, dispatch, action, actionArgs = {} }) => {
    event.preventDefault();
    dispatch(action(actionArgs));
};

export const isValidPass = (regex, compareWith) => regex.test(compareWith);

export const matchPass = (compareWith, compareTo) => compareWith === compareTo;

export const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/);

export const validatePassword = ({ regex, compareWith, compareTo }) => {
    if (isValidPass(regex, compareWith)) return matchPass(compareWith, compareTo);
};
