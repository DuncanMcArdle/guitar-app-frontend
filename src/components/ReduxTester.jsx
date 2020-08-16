import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease, getConfig } from '../apples/configSlice.js';

export default function ReduxTester() {

    const config = useSelector(getConfig);
    const dispatch = useDispatch();


    return (
        <div>
            <p>Current config: {JSON.stringify(config)}</p>
        </div>
    )
}
