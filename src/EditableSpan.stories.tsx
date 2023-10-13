import { action } from '@storybook/addon-actions'
import { EditableSpan } from './EditableSpan';

export default {
    title: 'EditableSpan component',
    component: EditableSpan,
}

const changeCallback = action('value changet ')

export const EditableSpanExample = (props: any) => {

    return (
        <EditableSpan title={'start value'} onChange={changeCallback} />
    )
}

