import { action } from '@storybook/addon-actions'
import AppWithRedux from './AppWithRedux'
import { ReduxStoreProviderDecorator } from './stories/ReduxStoreProviderDecorator'

export default {
    title: 'AppWithRedux component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

const changeCallback = action('value changet ')

export const AppWithReduxBaseExample = (props: any) => {
    return <AppWithRedux />

}

