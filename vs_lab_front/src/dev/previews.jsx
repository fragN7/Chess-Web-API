import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import {Chat} from "../Chat/Chat";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Chat">
                <Chat/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews