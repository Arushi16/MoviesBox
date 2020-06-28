export const renderWidth = (value) => {
    return value.includes('%') ? value :
        (
            value.split('/')[1] === '100' ? `${value.split('/')[0]}%` : `${value.split('/')[0] * 10}%`
        )
}

export const renderColor = (Value) => {
    return (Value.split('/')[1] === '10' ?
        (
            Value >= '7' ? 'green'
                :
                (Value >= '4' ? 'orange' : 'red')
        )
        :
        (
            Value.includes('%') ?
                (Value >= '70%' ? 'green'
                    :
                    (Value >= '40%' ? 'orange' : 'red'))
                :
                (
                    Value.split('/')[1] === '100' ?
                        (Value >= '70' ? 'green' : (Value >= '40' ? 'orange' : 'red')
                        )
                        :
                        'white'
                )
        ))
}