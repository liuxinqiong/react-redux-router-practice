const thunk = ({ dispatch, getState }) => next => action => {
    // 函数 执行一下
    // console.log(action, typeof action)
    if (typeof action === 'function') {
        return action(dispatch, getState)
    }

    // 如果不符合我们的要求，直接调用下一个中间件，使用next
    // 如果符合我们的要求，需要重新dispatch，调用dispatch即可

    // 默认什么都没干
    return next(action)
}

export default thunk;